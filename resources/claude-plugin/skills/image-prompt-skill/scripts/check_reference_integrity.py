#!/usr/bin/env python3
"""Validate the Image Prompt Skill reference architecture.

The checker intentionally uses only the Python standard library so it can run
locally and in GitHub Actions without installing dependencies.
"""

from __future__ import annotations

import re
import sys
from collections import defaultdict
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
RUNTIME_ROOTS = [ROOT / "SKILL.md", ROOT / "references", ROOT / "assets" / "templates"]
SCAN_ROOTS = [
    ROOT / "README.md",
    ROOT / "AGENTS.md",
    ROOT / "SKILL.md",
    ROOT / "references",
    ROOT / "assets" / "templates",
    ROOT / "docs",
]

MARKDOWN_LINK_RE = re.compile(r"!?\[[^\]]*\]\(([^)]+)\)")
INLINE_MD_RE = re.compile(r"`([^`\n]*?\.md(?:#[^`\n]*)?)`")
H1_RE = re.compile(r"^#\s+(.+?)\s*$", re.MULTILINE)

FORBIDDEN_RUNTIME_FRAGMENTS = (
    "docs/source-staging/",
    "source-staging/",
    "references/subjects/",
    "references/appendix/",
    "references/recipes/",
)

FORBIDDEN_LEGACY_PATHS = (
    "references/subjects",
    "references/appendix",
    "references/recipes",
    "references/input-image-ref",
    "references/input-text-only",
    "references/mode-interactive",
    "references/mode-quick",
    "references/portrait",
    "references/scene-office",
    "references/style-control",
    "references/task-character-assets",
    "references/task-finished-image",
    "references/task-image-to-image",
    "references/task-scene-assets",
    "references/task-storyboard-assets",
    "references/task-video-reference-frames",
)

REQUIRED_PATHS = (
    "README.md",
    "AGENTS.md",
    "SKILL.md",
    "references/index.md",
    "references/inputs/index.md",
    "references/tasks/index.md",
    "references/controls/index.md",
    "references/libraries/index.md",
    "references/styles/index.md",
    "references/diagnostics/index.md",
    "references/SOURCES.md",
    "assets/templates/mode-quick-output-contract.md",
    "assets/templates/mode-interactive-output-contract.md",
)

IGNORED_DUPLICATE_BASENAMES = {"index.md", "playbook.md", "README.md"}


def markdown_files(paths: Iterable[Path]) -> list[Path]:
    result: set[Path] = set()
    for path in paths:
        if path.is_file() and path.suffix.lower() == ".md":
            result.add(path)
        elif path.is_dir():
            result.update(p for p in path.rglob("*.md") if p.is_file())
    return sorted(result)


def strip_target(target: str) -> str:
    target = unquote(target.strip())
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    return target.split("#", 1)[0].strip()


def is_external_or_virtual(target: str) -> bool:
    lowered = target.lower()
    return (
        not target
        or target.startswith("#")
        or lowered.startswith(("http://", "https://", "mailto:", "tel:", "data:"))
        or "*" in target
        or "{" in target
        or "}" in target
    )


def is_runtime_file(path: Path) -> bool:
    if path == ROOT / "SKILL.md":
        return True
    return any(root.is_dir() and root in path.parents for root in RUNTIME_ROOTS)


def resolve_target(source: Path, raw_target: str) -> Path | None:
    target = strip_target(raw_target)
    if is_external_or_virtual(target):
        return None

    candidate = (source.parent / target).resolve()
    if candidate.exists():
        return candidate

    root_candidate = (ROOT / target).resolve()
    if root_candidate.exists():
        return root_candidate

    return candidate


def collect_reference_targets(text: str, include_inline: bool) -> set[str]:
    targets = {match.group(1).strip() for match in MARKDOWN_LINK_RE.finditer(text)}
    if include_inline:
        targets.update(match.group(1).strip() for match in INLINE_MD_RE.finditer(text))
    return targets


def check_required_paths(errors: list[str]) -> None:
    for relative in REQUIRED_PATHS:
        if not (ROOT / relative).exists():
            errors.append(f"required architecture path missing: {relative}")


def check_links(files: list[Path], errors: list[str]) -> None:
    for path in files:
        text = path.read_text(encoding="utf-8")
        targets = collect_reference_targets(text, include_inline=is_runtime_file(path))
        for raw_target in sorted(targets):
            resolved = resolve_target(path, raw_target)
            if resolved is not None and not resolved.exists():
                try:
                    display = resolved.relative_to(ROOT)
                except ValueError:
                    display = resolved
                errors.append(
                    f"dangling path: {path.relative_to(ROOT)} -> {raw_target} "
                    f"(resolved as {display})"
                )


def check_index_targets(errors: list[str]) -> None:
    for path in sorted((ROOT / "references").rglob("index.md")):
        text = path.read_text(encoding="utf-8")
        targets = collect_reference_targets(text, include_inline=True)
        for raw_target in sorted(targets):
            target = strip_target(raw_target)
            if not target.endswith(".md") or is_external_or_virtual(target):
                continue
            resolved = resolve_target(path, raw_target)
            if resolved is None or not resolved.exists():
                errors.append(f"index target missing: {path.relative_to(ROOT)} -> {raw_target}")


def check_forbidden_runtime_paths(errors: list[str]) -> None:
    for path in markdown_files(RUNTIME_ROOTS):
        text = path.read_text(encoding="utf-8")
        for fragment in FORBIDDEN_RUNTIME_FRAGMENTS:
            if fragment in text:
                errors.append(
                    f"forbidden runtime path '{fragment}' in {path.relative_to(ROOT)}"
                )


def check_legacy_paths_removed(errors: list[str]) -> None:
    for relative in FORBIDDEN_LEGACY_PATHS:
        path = ROOT / relative
        if path.exists():
            errors.append(f"legacy path still exists: {relative}")


def check_empty_leaves(errors: list[str]) -> None:
    for path in sorted((ROOT / "references").rglob("*.md")):
        if path.name in {"index.md", "SOURCES.md"}:
            continue
        text = path.read_text(encoding="utf-8")
        nonempty = [line.strip() for line in text.splitlines() if line.strip()]
        if len(nonempty) < 6 or not any(line.startswith("## ") for line in nonempty):
            errors.append(f"empty or title-only leaf: {path.relative_to(ROOT)}")


def check_duplicate_names_and_titles(errors: list[str]) -> None:
    leaves = [
        path
        for path in (ROOT / "references").rglob("*.md")
        if path.name not in {"index.md", "SOURCES.md"}
    ]

    by_basename: dict[str, list[Path]] = defaultdict(list)
    by_title: dict[str, list[Path]] = defaultdict(list)

    for path in leaves:
        if path.name not in IGNORED_DUPLICATE_BASENAMES:
            by_basename[path.name.lower()].append(path)
        text = path.read_text(encoding="utf-8")
        match = H1_RE.search(text)
        if not match:
            errors.append(f"leaf has no H1 title: {path.relative_to(ROOT)}")
        else:
            normalized = re.sub(r"\s+", " ", match.group(1).strip().lower())
            by_title[normalized].append(path)

    for name, paths in sorted(by_basename.items()):
        if len(paths) > 1:
            errors.append(
                "duplicate leaf basename '" + name + "': "
                + ", ".join(str(path.relative_to(ROOT)) for path in paths)
            )

    for title, paths in sorted(by_title.items()):
        if len(paths) > 1:
            errors.append(
                "duplicate leaf H1 '" + title + "': "
                + ", ".join(str(path.relative_to(ROOT)) for path in paths)
            )


def check_staging_directory(errors: list[str]) -> None:
    staging = ROOT / "docs" / "source-staging"
    if staging.exists():
        files = [path for path in staging.rglob("*") if path.is_file()]
        if files:
            errors.append(
                "source staging still contains files: "
                + ", ".join(str(path.relative_to(ROOT)) for path in sorted(files))
            )


def main() -> int:
    errors: list[str] = []
    files = markdown_files(SCAN_ROOTS)

    check_required_paths(errors)
    check_links(files, errors)
    check_index_targets(errors)
    check_forbidden_runtime_paths(errors)
    check_legacy_paths_removed(errors)
    check_empty_leaves(errors)
    check_duplicate_names_and_titles(errors)
    check_staging_directory(errors)

    if errors:
        print(f"Reference integrity check failed with {len(errors)} issue(s):")
        for index, error in enumerate(errors, start=1):
            print(f"{index}. {error}")
        return 1

    reference_count = len(list((ROOT / "references").rglob("*.md")))
    index_count = len(list((ROOT / "references").rglob("index.md")))
    print("Reference integrity check passed.")
    print(f"Markdown files scanned: {len(files)}")
    print(f"Reference files: {reference_count}")
    print(f"Route indexes: {index_count}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

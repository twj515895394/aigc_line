import log from 'electron-log/main';

/** Extract the text payload from a streamed agent message, if any. */
export function extractMessageText(message: unknown): string | null {
  if (!message) return null;

  // Handle string message directly
  if (typeof message === 'string') {
    return message;
  }

  if (typeof message !== 'object') {
    return null;
  }

  const msg = message as Record<string, unknown>;

  // Log the message type for debugging
  log.info('[Agent] message type:', msg.type, 'subtype:', msg.subtype);

  // Handle assistant messages with text content
  if (msg.type === 'assistant') {
    // Try to extract text from msg.message.content (SDK assistant message format)
    if (msg.message && typeof msg.message === 'object') {
      const messageData = msg.message as Record<string, unknown>;

      // Handle content array
      if (messageData.content && Array.isArray(messageData.content)) {
        const texts = messageData.content
          .filter((block: unknown) => block && typeof block === 'object' && (block as Record<string, unknown>).type === 'text')
          .map((block: unknown) => (block as Record<string, unknown>).text as string);
        return texts.join('');
      }

      // Handle direct content string
      if (typeof messageData.content === 'string') {
        return messageData.content;
      }
    }

    // Fallback: try direct text field
    if (msg.text && typeof msg.text === 'string') {
      return msg.text;
    }
  }

  return null;
}

/** Anthropic API message.id, then SDK uuid. Null if this is not an assistant frame. */
export function extractAssistantMessageId(message: unknown): string | null {
  if (!message || typeof message !== 'object') return null;
  const msg = message as Record<string, unknown>;
  if (msg.type !== 'assistant') return null;
  if (msg.message && typeof msg.message === 'object') {
    const id = (msg.message as Record<string, unknown>).id;
    if (typeof id === 'string' && id) return id;
  }
  return typeof msg.uuid === 'string' && msg.uuid ? msg.uuid : null;
}

/**
 * Same API message can arrive as duplicate frames or extra text blocks.
 * undefined = keep the previous content (no write).
 */
export function mergeAssistantText(previous: string | undefined, next: string): string | undefined {
  if (previous === undefined) return next;
  if (next === previous || previous.startsWith(next)) return undefined;
  if (next.startsWith(previous)) return next;
  return `${previous}${next}`;
}

import { describe, expect, it } from 'vitest'
import {
  extractAssistantMessageId,
  extractMessageText,
  mergeAssistantText,
} from '../electron/main/services/agent/stream'

const assistant = (id: string, text: string, uuid = 'frame-uuid') => ({
  type: 'assistant',
  uuid,
  message: {
    id,
    content: [{ type: 'text', text }],
  },
})

describe('Claude assistant stream frames', () => {
  it('uses the Anthropic API message.id, then the SDK uuid', () => {
    expect(extractAssistantMessageId(assistant('msg_abc', 'hello'))).toBe('msg_abc')
    expect(extractAssistantMessageId({ type: 'assistant', uuid: 'sdk-uuid', message: { content: [] } })).toBe('sdk-uuid')
    expect(extractAssistantMessageId({ type: 'result', uuid: 'result-uuid' })).toBeNull()
  })

  it('extracts text from assistant content blocks', () => {
    expect(extractMessageText(assistant('msg_abc', '是否启用?'))).toBe('是否启用?')
    expect(extractMessageText({ type: 'result', result: '是否启用?' })).toBeNull()
  })

  it('drops duplicate frames and grows in-place instead of appending a second bubble', () => {
    expect(mergeAssistantText(undefined, '是否启用?')).toBe('是否启用?')
    expect(mergeAssistantText('是否启用?', '是否启用?')).toBeUndefined()
    expect(mergeAssistantText('是否启用?', '是否')).toBeUndefined()
    expect(mergeAssistantText('是否', '是否启用?')).toBe('是否启用?')
    expect(mergeAssistantText('A', 'B')).toBe('AB')
  })
})

import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { expect } from 'vitest'

interface MediaQueryList {
  matches: boolean;
  media: string;
  onchange: ((this: void, ev: MediaQueryListEvent) => unknown) | null;
  addListener: (callback: (this: void, ev: MediaQueryListEvent) => unknown) => void;
  removeListener: (callback: (this: void, ev: MediaQueryListEvent) => unknown) => void;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
  dispatchEvent: (event: Event) => boolean;
}

// Extend matchers
expect.extend({})

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
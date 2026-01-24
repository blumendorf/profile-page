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
class MockIntersectionObserver {
  observe = vi.fn(function() {});
  unobserve = vi.fn(function() {});
  disconnect = vi.fn(function() {});
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn(function(query: string): MediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(function() {}),
      removeListener: vi.fn(function() {}),
      addEventListener: vi.fn(function() {}),
      removeEventListener: vi.fn(function() {}),
      dispatchEvent: vi.fn(function() { return true; }),
    };
  }),
})

// Mock HTMLCanvasElement.getContext for NetworkBackground component
HTMLCanvasElement.prototype.getContext = vi.fn(function() { return null; });

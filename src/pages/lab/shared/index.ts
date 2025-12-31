// Backward-compatible exports
export { webllmEngine, type ProgressCallback } from './engine';
export { checkCompatibility, type CompatibilityResult } from './compatibility';
export { DownloadProgress } from './DownloadProgress';
export { ModelSelector } from './ModelSelector';

// New model abstraction exports
export * from './models';

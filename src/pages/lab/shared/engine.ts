/**
 * Backward-compatible engine export.
 *
 * This maintains the existing API for the config experiment
 * while the HTML experiment can use the new model selection system.
 */
import { createEngine, DEFAULT_MODEL_ID } from './models';

// Re-export types for backward compatibility
export type { ProgressCallback } from './models';

// Create default engine singleton for backward compatibility
export const webllmEngine = createEngine(DEFAULT_MODEL_ID);

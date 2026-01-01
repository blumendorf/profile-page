export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

// Helper to create log entries
let logIdCounter = 0;
export function createLogEntry(
  level: LogEntry['level'],
  message: string
): LogEntry {
  return {
    id: `log-${++logIdCounter}-${Date.now()}`,
    timestamp: new Date(),
    level,
    message,
  };
}


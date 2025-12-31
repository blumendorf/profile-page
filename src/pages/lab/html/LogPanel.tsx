import { useEffect, useRef } from 'react';

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'success' | 'error' | 'warn';
  message: string;
}

interface LogPanelProps {
  logs: LogEntry[];
  className?: string;
}

const LEVEL_COLORS = {
  info: 'text-text-muted',
  success: 'text-emerald-400',
  error: 'text-red-400',
  warn: 'text-amber-400',
};

const LEVEL_ICONS = {
  info: '○',
  success: '✓',
  error: '✗',
  warn: '⚠',
};

export function LogPanel({ logs, className = '' }: LogPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div
      ref={containerRef}
      className={`font-mono text-xs overflow-auto bg-page-elevated rounded-lg border border-border-subtle p-4 ${className}`}
    >
      {logs.length === 0 ? (
        <div className="text-text-muted opacity-50">No events yet...</div>
      ) : (
        <div className="space-y-1">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-text-muted/50 flex-shrink-0">
                {formatTime(log.timestamp)}
              </span>
              <span className={`flex-shrink-0 ${LEVEL_COLORS[log.level]}`}>
                {LEVEL_ICONS[log.level]}
              </span>
              <span className={LEVEL_COLORS[log.level]}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
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


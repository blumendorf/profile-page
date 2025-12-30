import { useState, useCallback, useEffect } from 'react';
import { ChevronRight, ChevronDown, Copy, Check } from 'lucide-react';
import { siteData } from '../../data/siteData';

const API_PATH = '/api/v1/profile.json';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface JsonNodeProps {
  keyName?: string;
  value: JsonValue;
  depth?: number;
  isLast?: boolean;
  defaultExpanded?: boolean;
  focusedKey?: string | null;
  path?: string;
}

const JsonNode = ({
  keyName,
  value,
  depth = 0,
  isLast = true,
  defaultExpanded = true,
  focusedKey = null,
  path = ''
}: JsonNodeProps) => {
  const currentPath = keyName ? (path ? `${path}.${keyName}` : keyName) : path;
  const isTopLevelKey = depth === 1 && keyName;
  const isFocused = focusedKey && isTopLevelKey && keyName === focusedKey;
  const shouldCollapse = focusedKey && isTopLevelKey && keyName !== focusedKey;
  const isInsideFocusedSection = focusedKey && currentPath.startsWith(focusedKey);

  const getInitialExpanded = () => {
    if (focusedKey) {
      // Root level should always be expanded
      if (depth === 0) return true;
      // The focused section itself
      if (isFocused) return true;
      // Other top-level sections should collapse
      if (shouldCollapse) return false;
      // Everything inside the focused section should be expanded
      if (isInsideFocusedSection) return true;
      return false;
    }
    // Default behavior when no focus
    return defaultExpanded && depth < 2;
  };

  const [isExpanded, setIsExpanded] = useState(getInitialExpanded);

  // Update expansion state when focusedKey changes
  useEffect(() => {
    if (focusedKey !== null) {
      if (depth === 0) {
        // Root always expanded
        setIsExpanded(true);
      } else if (isFocused) {
        // The focused section
        setIsExpanded(true);
      } else if (shouldCollapse) {
        // Other top-level sections
        setIsExpanded(false);
      } else if (isInsideFocusedSection) {
        // Everything inside the focused section
        setIsExpanded(true);
      }
    } else {
      // Reset to default when focus is cleared
      setIsExpanded(depth < 2);
    }
  }, [focusedKey, isFocused, shouldCollapse, isInsideFocusedSection, depth]);

  const isObject = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);

  const entries = isObject ? Object.entries(value as object) : [];
  const preview = isArray
    ? `[${entries.length} items]`
    : isObject
      ? `{${entries.slice(0, 3).map(([k]) => k).join(', ')}${entries.length > 3 ? '...' : ''}}`
      : null;

  const renderValue = () => {
    if (value === null) return <span className="text-stone-500">null</span>;
    if (typeof value === 'boolean') return <span className="text-purple-400">{value.toString()}</span>;
    if (typeof value === 'number') return <span className="text-blue-400">{value}</span>;
    if (typeof value === 'string') return <span className="text-amber-300">"{value}"</span>;
    return null;
  };

  const indent = depth * 20;

  if (!isObject) {
    return (
      <div className="flex items-start py-0.5 hover:bg-white/5 rounded group" style={{ paddingLeft: indent }}>
        <span className="w-4" /> {/* Spacer for alignment */}
        {keyName !== undefined && (
          <>
            <span className="text-stone-300">"{keyName}"</span>
            <span className="text-stone-500 mx-1">:</span>
          </>
        )}
        {renderValue()}
        {!isLast && <span className="text-stone-500">,</span>}
      </div>
    );
  }

  return (
    <div>
      <div
        className={`flex items-start py-0.5 hover:bg-white/5 rounded cursor-pointer select-none group ${
          isFocused ? 'bg-amber-500/10 border-l-2 border-amber-500' : ''
        }`}
        style={{ paddingLeft: isFocused ? indent - 2 : indent }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="w-4 flex-shrink-0 text-stone-500">
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        {keyName !== undefined && (
          <>
            <span className={`${isFocused ? 'text-amber-400 font-semibold' : 'text-stone-300'}`}>"{keyName}"</span>
            <span className="text-stone-500 mx-1">:</span>
          </>
        )}
        <span className="text-stone-500">{isArray ? '[' : '{'}</span>
        {!isExpanded && (
          <>
            <span className="text-stone-600 mx-1 text-xs">{preview}</span>
            <span className="text-stone-500">{isArray ? ']' : '}'}</span>
            {!isLast && <span className="text-stone-500">,</span>}
          </>
        )}
      </div>

      {isExpanded && (
        <>
          {entries.map(([key, val], index) => (
            <JsonNode
              key={key}
              keyName={isArray ? undefined : key}
              value={val as JsonValue}
              depth={depth + 1}
              isLast={index === entries.length - 1}
              defaultExpanded={depth < 1}
              focusedKey={focusedKey}
              path={currentPath}
            />
          ))}
          <div className="flex py-0.5" style={{ paddingLeft: indent }}>
            <span className="w-4" />
            <span className="text-stone-500">{isArray ? ']' : '}'}</span>
            {!isLast && <span className="text-stone-500">,</span>}
          </div>
        </>
      )}
    </div>
  );
};

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Silently fail if clipboard access is denied
      });
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-2 py-1 text-xs text-stone-400 hover:text-amber-400 bg-stone-800 hover:bg-stone-700 rounded transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      <span>{copied ? 'Copied!' : label}</span>
    </button>
  );
};

interface JsonViewProps {
  focusedSection?: string | null;
}

const JsonView = ({ focusedSection = null }: JsonViewProps) => {
  const fullUrl = `${window.location.origin}${import.meta.env.BASE_URL}${API_PATH.slice(1)}`;
  const curlCommand = `curl ${fullUrl}`;

  return (
    <div className="min-h-screen bg-[#1e1e1e] pt-24 pb-12 px-6 font-mono text-sm relative z-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-stone-400">
          <span className="text-green-500 font-bold">GET</span>
          <a
            href={`${import.meta.env.BASE_URL}${API_PATH.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-stone-800 px-2 py-1 rounded hover:bg-stone-700 hover:text-amber-400 transition-colors"
            title="Open raw JSON"
          >
            {API_PATH}
          </a>
          <span className="text-stone-500">200 OK</span>
          <span className="text-stone-500">• application/json</span>
        </div>

        {/* Actions bar */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <CopyButton text={curlCommand} label="curl" />
          <CopyButton text={fullUrl} label="URL" />
          <CopyButton text={JSON.stringify(siteData, null, 2)} label="JSON" />
          {focusedSection && (
            <span className="ml-2 text-xs text-amber-400">
              Focused: <code className="bg-stone-800 px-1.5 py-0.5 rounded">{focusedSection}</code>
            </span>
          )}
        </div>

        {/* Interactive JSON Tree */}
        <div className="rounded-lg overflow-hidden border border-stone-800 shadow-2xl bg-[#1e1e1e]">
          <div className="p-4 overflow-x-auto text-[13px] leading-relaxed">
            <JsonNode
              value={siteData as JsonValue}
              defaultExpanded={true}
              focusedKey={focusedSection}
            />
          </div>
        </div>

        {/* Hint */}
        <p className="mt-4 text-xs text-stone-600 text-center">
          Click on objects to expand/collapse • Use nav links to focus sections
        </p>
      </div>
    </div>
  );
};

export default JsonView;

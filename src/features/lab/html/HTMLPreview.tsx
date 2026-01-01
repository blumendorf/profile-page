import { useEffect, useRef } from 'react';

interface HTMLPreviewProps {
  html: string;
  className?: string;
}

export function HTMLPreview({ html, className = '' }: HTMLPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      // Use srcdoc for security - no external network access
      iframeRef.current.srcdoc = html;
    }
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title="Generated Profile Preview"
      className={`w-full bg-white rounded-lg ${className}`}
      sandbox="allow-scripts"
      style={{ border: 'none' }}
    />
  );
}


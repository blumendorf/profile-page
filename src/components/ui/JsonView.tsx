import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { siteData } from '../../data/siteData';

const API_PATH = '/api/v1/profile.json';

const JsonView = () => {
  const fullUrl = `${window.location.origin}${import.meta.env.BASE_URL}${API_PATH.slice(1)}`;

  return (
    <div className="min-h-screen bg-[#1e1e1e] pt-24 pb-12 px-6 font-mono text-sm relative z-20">
      <div className="max-w-4xl mx-auto">
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

        <div className="mb-4 text-xs text-stone-500">
          <span className="text-stone-600">curl</span>{' '}
          <span className="text-stone-400 select-all">{fullUrl}</span>
        </div>

        <div className="rounded-lg overflow-hidden border border-stone-800 shadow-2xl">
          <SyntaxHighlighter
            language="json"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              backgroundColor: '#1e1e1e',
              fontSize: '14px',
              lineHeight: '1.5',
            }}
            wrapLines={true}
          >
            {JSON.stringify(siteData, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default JsonView;

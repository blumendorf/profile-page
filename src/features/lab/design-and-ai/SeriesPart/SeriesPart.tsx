import { useEffect, useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FlaskConical } from 'lucide-react';
import {
  designAndAiSeries,
  getNext,
  getPart,
  getPrevious,
  seriesBasePath,
  seriesLength,
  seriesTitle,
  type SeriesPartMeta,
} from '../parts';
import { SeriesNav } from '../SeriesNav';
import { Pill } from '../../shared/components';

export interface SeriesPartProps {
  partNumber: number;
  /**
   * Optional override of the rendered body. Defaults to react-markdown over the part's `raw`.
   * Useful for stories or for parts that need extra in-page UI.
   */
  children?: ReactNode;
}

/**
 * Resolves a markdown link href against the series, returning either an absolute in-app
 * path (e.g. `/lab/design-and-ai/storybook`) or `null` when the link is external / unrelated.
 */
const resolveSeriesLink = (
  href: string | undefined,
  currentPath: string,
): string | null => {
  if (!href) return null;

  if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
    return null;
  }

  const trimmed = href.replace(/\/$/, '');

  if (trimmed.startsWith('/lab/design-and-ai')) {
    return trimmed === '' ? '/' : href;
  }

  if (trimmed.startsWith('../')) {
    const cleanedSegments = currentPath.split('/').filter(Boolean);
    const baseSegments = cleanedSegments.slice(0, -1);
    const upSegments = trimmed.split('/').filter((s) => s && s !== '..');
    const ups = trimmed.split('/').filter((s) => s === '..').length;
    const finalBase = baseSegments.slice(0, baseSegments.length - (ups - 1));
    const resolved = '/' + [...finalBase, ...upSegments].join('/');
    return resolved.replace(/\/$/, '') || '/';
  }

  if (trimmed === '..') {
    return seriesBasePath;
  }

  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  return null;
};

const buildMarkdownComponents = (currentPath: string): Components => {
  return {
    h1: () => null,
    h2: ({ children }) => (
      <h2 className="heading-lg mt-12 mb-4 scroll-mt-24">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="heading-md mt-8 mb-3 scroll-mt-24">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-muted leading-relaxed mb-5">{children}</p>
    ),
    a: ({ href, children, ...rest }: ComponentPropsWithoutRef<'a'>) => {
      const resolved = resolveSeriesLink(href, currentPath);
      if (resolved && (resolved.startsWith('/') || resolved === '#')) {
        return (
          <Link to={resolved} className="link">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
          {...rest}
        >
          {children}
        </a>
      );
    },
    em: ({ children }) => <em className="italic text-text-secondary">{children}</em>,
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    code: ({ children, ...rest }: ComponentPropsWithoutRef<'code'>) => {
      const isBlock = (rest as { className?: string }).className?.includes('language-');
      if (isBlock) {
        return (
          <code className="font-mono text-sm" {...rest}>
            {children}
          </code>
        );
      }
      return (
        <code className="font-mono text-[0.92em] text-accent bg-surface/60 px-1.5 py-0.5 rounded">
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre className="font-mono text-sm bg-surface/60 border border-border-subtle rounded-lg p-4 mb-6 overflow-x-auto">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="quote my-6">{children}</blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-muted">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    hr: () => <hr className="my-10 border-border-subtle" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-border-subtle text-text-primary">{children}</thead>
    ),
    th: ({ children }) => (
      <th className="text-left font-medium px-3 py-2">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-3 py-2 align-top border-b border-border-subtle/40 text-muted">
        {children}
      </td>
    ),
  };
};

/**
 * Strips the YAML front-matter and the H1 from a markdown body, since the SeriesPart shell
 * renders its own title block from the manifest.
 */
const prepareMarkdown = (raw: string): string => {
  let body = raw.startsWith('---')
    ? raw.replace(/^---[\s\S]*?\n---\s*\n?/, '')
    : raw;

  body = body.replace(/^#\s.+\n/, '');

  body = body.replace(
    /^\*Part of \[[^\]]+\]\([^)]+\)\.\*\s*\n+/,
    '',
  );

  return body.trim();
};

const renderTableOfContents = (currentPart: number): ReactNode => (
  <ol className="not-prose grid gap-3 my-8">
    {designAndAiSeries
      .filter((p) => p.partNumber !== currentPart)
      .map((part) => (
        <li key={part.partNumber}>
          <Link
            to={part.path}
            className="group flex items-baseline gap-3 rounded-md border border-border-subtle bg-surface/30 p-4 hover:border-accent/50 transition-colors"
          >
            <span className="font-mono text-xs text-text-muted shrink-0">
              Part {part.partNumber}
            </span>
            <span className="flex-1">
              <span className="block text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                {part.title}
              </span>
              <span className="block text-xs text-text-muted leading-relaxed mt-1">
                {part.description}
              </span>
            </span>
          </Link>
        </li>
      ))}
  </ol>
);

export const SeriesPart = ({ partNumber, children }: SeriesPartProps) => {
  const part = getPart(partNumber);
  const previous = getPrevious(partNumber);
  const next = getNext(partNumber);

  useEffect(() => {
    document.title = `${part.title} — Lab`;
    window.scrollTo({ top: 0 });
  }, [part.title]);

  const components = useMemo(
    () => buildMarkdownComponents(part.path),
    [part.path],
  );

  const body = useMemo(() => prepareMarkdown(part.raw), [part.raw]);

  const isIntro = partNumber === 1;
  const tocPlaceholder = '{{SERIES_TOC}}';
  const introBody = useMemo(() => {
    if (!isIntro) return null;
    return body.replace(
      /## Lab notes[\s\S]*?(?=\n## )/,
      `## Lab notes\n\n${tocPlaceholder}\n\n`,
    );
  }, [body, isIntro]);

  const tocComponents: Components = useMemo(() => {
    if (!isIntro) return components;
    const matchesTocPlaceholder = (value: ReactNode): boolean => {
      if (value === tocPlaceholder) return true;
      if (Array.isArray(value)) {
        return value.length === 1 && value[0] === tocPlaceholder;
      }
      return false;
    };
    return {
      ...components,
      p: ({ children: pChildren, ...rest }) => {
        if (matchesTocPlaceholder(pChildren)) {
          return <>{renderTableOfContents(partNumber)}</>;
        }
        return (
          <p className="text-muted leading-relaxed mb-5" {...rest}>
            {pChildren}
          </p>
        );
      },
    };
  }, [components, isIntro, partNumber]);

  return (
    <article className="min-h-screen bg-page text-text-primary">
      <header className="border-b border-border-subtle/60 bg-page/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <Link
              to={seriesBasePath}
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors min-w-0"
            >
              <FlaskConical size={14} aria-hidden className="shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-70 hidden sm:inline">
                Series
              </span>
              <span className="text-xs sm:text-sm truncate">
                {seriesTitle}
              </span>
            </Link>
            <Pill className="shrink-0">
              Part {part.partNumber} of {seriesLength}
            </Pill>
          </div>
          <SeriesNav
            previous={previous}
            next={next}
            currentPart={part.partNumber}
            totalParts={seriesLength}
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="mb-10">
          <p className="section-label mb-4">// part {part.partNumber}</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            {part.title}
          </h1>
          <p className="text-body max-w-2xl">{part.description}</p>
        </div>

        <p
          aria-label="Authorship note"
          className="mb-10 text-xs italic text-text-muted/70"
        >
          This article is written in collaboration with Claude Opus 4.7 based on research, phrased in my tone of voice.
        </p>

        <div>
          {children ?? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={tocComponents}>
              {isIntro ? (introBody ?? body) : body}
            </ReactMarkdown>
          )}
        </div>

        <footer className="mt-16 pt-10 border-t border-border-subtle">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted mb-5">
            Continue reading
          </p>
          <SeriesNav
            previous={previous}
            next={next}
            currentPart={part.partNumber}
            totalParts={seriesLength}
            variant="cards"
          />
        </footer>
      </div>
    </article>
  );
};

export type { SeriesPartMeta };

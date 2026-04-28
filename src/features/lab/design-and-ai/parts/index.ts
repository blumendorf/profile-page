import intro from './01-intro.md?raw';
import designMd from './02-design-md.md?raw';
import storybook from './03-storybook.md?raw';
import componentsAndTokens from './04-components-and-tokens.md?raw';
import figmaJobs from './05-figma-jobs.md?raw';
import tools from './06-tools.md?raw';
import workflow from './07-workflow.md?raw';

export interface SeriesPartMeta {
  partNumber: number;
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  description: string;
  raw: string;
}

export const seriesBasePath = '/lab/design-and-ai';

export const seriesTitle = 'UI/UX design in the age of AI-assisted engineering';

export const designAndAiSeries: readonly SeriesPartMeta[] = [
  {
    partNumber: 1,
    slug: '',
    path: seriesBasePath,
    title: seriesTitle,
    shortTitle: 'Introduction',
    description:
      'Why I added DESIGN.md and Storybook to a 2026 codebase, and what changes when agents read the same files humans write.',
    raw: intro,
  },
  {
    partNumber: 2,
    slug: 'design-md',
    path: `${seriesBasePath}/design-md`,
    title: 'DESIGN.md: history and 2026 reframing',
    shortTitle: 'DESIGN.md',
    description:
      "From Google's design-doc culture and Nygard's ADRs to matklad's ARCHITECTURE.md, then the April 2026 Stitch DESIGN.md specification.",
    raw: designMd,
  },
  {
    partNumber: 3,
    slug: 'storybook',
    path: `${seriesBasePath}/storybook`,
    title: 'Storybook as verification layer and agent registry',
    shortTitle: 'Storybook',
    description:
      'What Storybook is for now that agents read it, including the limits real teams hit when components stop being reusable.',
    raw: storybook,
  },
  {
    partNumber: 4,
    slug: 'components-and-tokens',
    path: `${seriesBasePath}/components-and-tokens`,
    title: 'Components and design tokens',
    shortTitle: 'Components and tokens',
    description:
      "Token hierarchy, why 'the component is the spec,' how this layer reads to humans and agents differently.",
    raw: componentsAndTokens,
  },
  {
    partNumber: 5,
    slug: 'figma-jobs',
    path: `${seriesBasePath}/figma-jobs`,
    title: 'Removing Figma: the four jobs it was bundling',
    shortTitle: 'Removing Figma',
    description:
      'Exploration, communication with non-engineers, non-component design work, whole-flow thinking, and what replaces each.',
    raw: figmaJobs,
  },
  {
    partNumber: 6,
    slug: 'tools',
    path: `${seriesBasePath}/tools`,
    title: 'Tools for AI-assisted UI work, surveyed',
    shortTitle: 'Tools survey',
    description:
      'Canvas-as-code, codebase-integrated builders, and standalone Figma replacements. Categories matter more than the products.',
    raw: tools,
  },
  {
    partNumber: 7,
    slug: 'workflow',
    path: `${seriesBasePath}/workflow`,
    title: 'The 2026 workflow',
    shortTitle: 'The workflow',
    description:
      'Five stages (idea, concept, materialisation, verification, documentation), role redefinition, and predictions worth tracking.',
    raw: workflow,
  },
] as const;

export const seriesLength = designAndAiSeries.length;

export const getPart = (partNumber: number): SeriesPartMeta => {
  const part = designAndAiSeries.find((p) => p.partNumber === partNumber);
  if (!part) {
    throw new Error(`Unknown design-and-ai series part: ${partNumber}`);
  }
  return part;
};

export const getPartBySlug = (slug: string): SeriesPartMeta | undefined =>
  designAndAiSeries.find((p) => p.slug === slug);

export const getPrevious = (partNumber: number): SeriesPartMeta | undefined =>
  designAndAiSeries.find((p) => p.partNumber === partNumber - 1);

export const getNext = (partNumber: number): SeriesPartMeta | undefined =>
  designAndAiSeries.find((p) => p.partNumber === partNumber + 1);

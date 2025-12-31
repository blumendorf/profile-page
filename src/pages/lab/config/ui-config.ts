export interface UIConfig {
  persona: 'technical' | 'nonTechnical' | 'custom';

  layout: {
    sectionOrder: SectionId[];
    density: 'compact' | 'comfortable' | 'spacious';
  };

  sections: {
    hero: {
      showTags: boolean;
      headlineVariant: 'default' | 'technical' | 'nonTechnical';
    };
    about: {
      variant: 'technical' | 'nonTechnical' | 'default';
      showPillars: boolean;
      showQuote: boolean;
    };
    techStack: {
      visible: boolean;
      expanded: string[];
      showVersions: boolean;
    };
    expertise: {
      visible: boolean;
    };
    journey: {
      visible: boolean;
      expandedPhases: number[];
    };
    contact: {
      visible: boolean;
      prominent: boolean;
    };
  };

  theme: {
    variant: 'default' | 'terminal' | 'minimal' | 'warm';
    accentColor: 'amber' | 'cyan' | 'emerald' | 'rose';
    fontStyle: 'sans' | 'mono' | 'mixed';
  };

  meta: {
    generatedAt: string;
    userIntent: string;
    modelUsed: string;
    generationTimeMs: number;
  };
}

export type SectionId = 'hero' | 'about' | 'techStack' | 'expertise' | 'journey' | 'contact';

export const DEFAULT_CONFIG: UIConfig = {
  persona: 'nonTechnical',
  layout: {
    sectionOrder: ['hero', 'about', 'expertise', 'techStack', 'journey', 'contact'],
    density: 'comfortable',
  },
  sections: {
    hero: { showTags: true, headlineVariant: 'default' },
    about: { variant: 'default', showPillars: true, showQuote: true },
    techStack: { visible: true, expanded: [], showVersions: false },
    expertise: { visible: true },
    journey: { visible: true, expandedPhases: [0] },
    contact: { visible: true, prominent: false },
  },
  theme: {
    variant: 'default',
    accentColor: 'amber',
    fontStyle: 'mixed',
  },
  meta: {
    generatedAt: '',
    userIntent: '',
    modelUsed: 'default',
    generationTimeMs: 0,
  },
};


import { webllmEngine } from '../shared';
import { UIConfig, DEFAULT_CONFIG } from './ui-config';

const SYSTEM_PROMPT = `Return JSON only. Pick theme based on user type:
- engineer/developer/technical: {"persona":"technical","theme":{"variant":"terminal","accentColor":"cyan","fontStyle":"mono"},"sections":{"about":{"variant":"technical"},"techStack":{"visible":true,"expanded":["Frontend","AI & ML"]}}}
- recruiter/hiring/hr: {"persona":"nonTechnical","theme":{"variant":"warm","accentColor":"amber","fontStyle":"sans"},"sections":{"about":{"variant":"nonTechnical"},"contact":{"prominent":true}}}
- other: {"persona":"custom","theme":{"variant":"default","accentColor":"amber","fontStyle":"mixed"}}`;

export async function generateUIConfig(userIntent: string): Promise<UIConfig> {
  const startTime = Date.now();

  const prompt = `${SYSTEM_PROMPT}

User: "${userIntent}"
JSON:`;

  try {
    const response = await webllmEngine.generate(prompt);

    // Extract JSON from response (model might add text around it)
    // Try to find the outermost complete JSON object
    let jsonStr = '';
    let braceCount = 0;
    let inJson = false;
    let startIdx = -1;

    for (let i = 0; i < response.length; i++) {
      const char = response[i];
      if (char === '{') {
        if (!inJson) {
          inJson = true;
          startIdx = i;
        }
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0 && inJson) {
          jsonStr = response.substring(startIdx, i + 1);
          break;
        }
      }
    }

    if (!jsonStr) {
      // Fallback: try regex
      const jsonMatch = response.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      } else {
        console.error('Raw response:', response);
        throw new Error('No JSON found in response');
      }
    }

    // Clean up common issues
    jsonStr = jsonStr
      .replace(/,\s*}/g, '}')  // Remove trailing commas
      .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
      .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters

    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('JSON parse error, raw string:', jsonStr);
      throw parseErr;
    }

    // Deep merge with defaults
    const config: UIConfig = {
      ...DEFAULT_CONFIG,
      ...parsed,
      layout: { ...DEFAULT_CONFIG.layout, ...parsed.layout },
      sections: {
        hero: { ...DEFAULT_CONFIG.sections.hero, ...parsed.sections?.hero },
        about: { ...DEFAULT_CONFIG.sections.about, ...parsed.sections?.about },
        techStack: { ...DEFAULT_CONFIG.sections.techStack, ...parsed.sections?.techStack },
        expertise: { ...DEFAULT_CONFIG.sections.expertise, ...parsed.sections?.expertise },
        journey: { ...DEFAULT_CONFIG.sections.journey, ...parsed.sections?.journey },
        contact: { ...DEFAULT_CONFIG.sections.contact, ...parsed.sections?.contact },
      },
      theme: { ...DEFAULT_CONFIG.theme, ...parsed.theme },
      meta: {
        generatedAt: new Date().toISOString(),
        userIntent,
        modelUsed: webllmEngine.getModelId(),
        generationTimeMs: Date.now() - startTime,
      },
    };

    return config;
  } catch (error) {
    console.error('Config generation failed:', error);
    return {
      ...DEFAULT_CONFIG,
      meta: {
        ...DEFAULT_CONFIG.meta,
        generatedAt: new Date().toISOString(),
        userIntent,
        modelUsed: 'fallback',
        generationTimeMs: Date.now() - startTime,
      },
    };
  }
}


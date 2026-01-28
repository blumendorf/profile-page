/**
 * Constraint checker for evaluating generated HTML/CSS
 */

import {
  colorToHSL,
  extractCSSColor,
  extractSelectorColor,
  isHueInRange,
  getLuminanceCategory,
} from './color-utils';
import type { Constraint, TestCase, Luminance } from './test-cases';

export interface ConstraintResult {
  constraint: Constraint;
  passed: boolean;
  actual?: string;
  expected?: string;
  reason?: string;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  constraintResults: ConstraintResult[];
  generationTimeMs: number;
  rawOutput?: string;
}

/**
 * Extract CSS from HTML (finds <style> tag content)
 */
function extractCSS(html: string): string {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  return styleMatch ? styleMatch[1] : '';
}

/**
 * Check a single constraint against CSS
 */
function checkConstraint(css: string, constraint: Constraint): ConstraintResult {
  switch (constraint.type) {
    case 'bgHue': {
      const bgColor = extractCSSColor(css, 'background');
      if (!bgColor) {
        return {
          constraint,
          passed: false,
          reason: 'No background color found',
        };
      }
      const hsl = colorToHSL(bgColor);
      if (!hsl) {
        return {
          constraint,
          passed: false,
          actual: bgColor,
          reason: 'Could not parse background color',
        };
      }
      const [min, max] = constraint.range;
      const passed = isHueInRange(hsl.h, min, max);
      return {
        constraint,
        passed,
        actual: `${bgColor} (hue: ${Math.round(hsl.h)}°)`,
        expected: `hue in [${min}, ${max}]`,
        reason: passed ? undefined : `Hue ${Math.round(hsl.h)}° not in range [${min}, ${max}]`,
      };
    }

    case 'bgLuminance': {
      const bgColor = extractCSSColor(css, 'background');
      if (!bgColor) {
        return {
          constraint,
          passed: false,
          reason: 'No background color found',
        };
      }
      const hsl = colorToHSL(bgColor);
      if (!hsl) {
        return {
          constraint,
          passed: false,
          actual: bgColor,
          reason: 'Could not parse background color',
        };
      }
      const lumCategory = getLuminanceCategory(hsl.l);
      const passed = checkLuminance(lumCategory, constraint.value);
      return {
        constraint,
        passed,
        actual: `${bgColor} (L: ${(hsl.l * 100).toFixed(0)}%, ${lumCategory})`,
        expected: constraint.value,
        reason: passed ? undefined : `Luminance ${lumCategory} doesn't match ${constraint.value}`,
      };
    }

    case 'textHue': {
      const textColor = extractCSSColor(css, 'color');
      if (!textColor) {
        return {
          constraint,
          passed: false,
          reason: 'No text color found in body',
        };
      }
      const hsl = colorToHSL(textColor);
      if (!hsl) {
        return {
          constraint,
          passed: false,
          actual: textColor,
          reason: 'Could not parse text color',
        };
      }
      const [min, max] = constraint.range;
      const passed = isHueInRange(hsl.h, min, max);
      return {
        constraint,
        passed,
        actual: `${textColor} (hue: ${Math.round(hsl.h)}°)`,
        expected: `hue in [${min}, ${max}]`,
        reason: passed ? undefined : `Hue ${Math.round(hsl.h)}° not in range [${min}, ${max}]`,
      };
    }

    case 'textLuminance': {
      const textColor = extractCSSColor(css, 'color');
      if (!textColor) {
        return {
          constraint,
          passed: false,
          reason: 'No text color found',
        };
      }
      const hsl = colorToHSL(textColor);
      if (!hsl) {
        return {
          constraint,
          passed: false,
          actual: textColor,
          reason: 'Could not parse text color',
        };
      }
      const lumCategory = getLuminanceCategory(hsl.l);
      const passed = checkLuminance(lumCategory, constraint.value);
      return {
        constraint,
        passed,
        actual: `${textColor} (L: ${(hsl.l * 100).toFixed(0)}%, ${lumCategory})`,
        expected: constraint.value,
        reason: passed ? undefined : `Luminance ${lumCategory} doesn't match ${constraint.value}`,
      };
    }

    case 'accentHue': {
      const accentColor = extractSelectorColor(css, constraint.selector, 'color');
      if (!accentColor) {
        return {
          constraint,
          passed: false,
          reason: `No color found for selector ${constraint.selector}`,
        };
      }
      const hsl = colorToHSL(accentColor);
      if (!hsl) {
        return {
          constraint,
          passed: false,
          actual: accentColor,
          reason: 'Could not parse accent color',
        };
      }
      const [min, max] = constraint.range;
      const passed = isHueInRange(hsl.h, min, max);
      return {
        constraint,
        passed,
        actual: `${accentColor} (hue: ${Math.round(hsl.h)}°)`,
        expected: `hue in [${min}, ${max}]`,
        reason: passed ? undefined : `Hue ${Math.round(hsl.h)}° not in range [${min}, ${max}]`,
      };
    }

    case 'fontFamily': {
      const fontPatterns: Record<string, RegExp> = {
        monospace: /monospace|courier|consolas|monaco|menlo|source\s*code/i,
        serif: /serif|georgia|times|garamond|palatino|baskerville/i,
        'sans-serif': /sans-serif|system-ui|arial|helvetica|inter|roboto|segoe/i,
      };
      const pattern = fontPatterns[constraint.category];
      const fontMatch = css.match(/font-family\s*:\s*([^;{}]+)/i);
      const fontValue = fontMatch ? fontMatch[1] : '';
      const passed = pattern.test(fontValue);
      return {
        constraint,
        passed,
        actual: fontValue || 'not found',
        expected: constraint.category,
        reason: passed ? undefined : `Font "${fontValue}" doesn't match ${constraint.category}`,
      };
    }

    case 'cssContains': {
      const pattern = constraint.pattern.toLowerCase();
      const passed = css.toLowerCase().includes(pattern);
      return {
        constraint,
        passed,
        expected: `contains "${pattern}"`,
        reason: passed ? undefined : `CSS doesn't contain "${pattern}"`,
      };
    }

    case 'cssNotContains': {
      const pattern = constraint.pattern.toLowerCase();
      const passed = !css.toLowerCase().includes(pattern);
      return {
        constraint,
        passed,
        expected: `does not contain "${pattern}"`,
        reason: passed ? undefined : `CSS contains "${pattern}" but shouldn't`,
      };
    }

    default:
      return {
        constraint,
        passed: false,
        reason: `Unknown constraint type`,
      };
  }
}

/**
 * Check if luminance category matches expected value
 */
function checkLuminance(
  actual: 'black' | 'dark' | 'medium' | 'light' | 'white',
  expected: Luminance
): boolean {
  switch (expected) {
    case 'black':
      return actual === 'black';
    case 'dark':
      return actual === 'black' || actual === 'dark';
    case 'light':
      return actual === 'light' || actual === 'white';
    case 'white':
      return actual === 'white';
    default:
      return false;
  }
}

/**
 * Run all constraints for a test case against generated HTML
 */
export function checkTestCase(html: string, testCase: TestCase): Omit<TestResult, 'generationTimeMs' | 'rawOutput'> {
  const css = extractCSS(html);
  const constraintResults = testCase.constraints.map((c) => checkConstraint(css, c));
  const passed = constraintResults.every((r) => r.passed);

  return {
    testCase,
    passed,
    constraintResults,
  };
}

/**
 * Check if HTML is structurally valid
 */
export function isValidHTML(html: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const lower = html.toLowerCase();

  if (!lower.includes('<!doctype') && !lower.includes('<html')) {
    errors.push('Missing DOCTYPE or <html> tag');
  }
  if (!lower.includes('<head')) {
    errors.push('Missing <head> tag');
  }
  if (!lower.includes('<body')) {
    errors.push('Missing <body> tag');
  }
  if (!lower.includes('</html>')) {
    errors.push('Missing closing </html> tag');
  }
  if (!lower.includes('<style')) {
    errors.push('Missing <style> tag');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}


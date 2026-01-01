/**
 * Color utilities for CSS evaluation
 */

export interface HSL {
  h: number; // 0-360
  s: number; // 0-1
  l: number; // 0-1
}

export interface RGB {
  r: number; // 0-255
  g: number;
  b: number;
}

/**
 * Parse a color string to RGB
 * Supports: #rgb, #rrggbb, rgb(), rgba(), named colors
 */
export function parseColor(color: string): RGB | null {
  const c = color.trim().toLowerCase();

  // Named colors (common ones)
  const namedColors: Record<string, RGB> = {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    blue: { r: 0, g: 0, b: 255 },
    lime: { r: 0, g: 255, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    cyan: { r: 0, g: 255, b: 255 },
    magenta: { r: 255, g: 0, b: 255 },
    purple: { r: 128, g: 0, b: 128 },
    orange: { r: 255, g: 165, b: 0 },
    pink: { r: 255, g: 192, b: 203 },
    gray: { r: 128, g: 128, b: 128 },
    grey: { r: 128, g: 128, b: 128 },
  };

  if (namedColors[c]) {
    return namedColors[c];
  }

  // Hex: #rgb or #rrggbb
  if (c.startsWith('#')) {
    const hex = c.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = c.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
    };
  }

  return null;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHSL(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h, s, l };
}

/**
 * Parse color string directly to HSL
 */
export function colorToHSL(color: string): HSL | null {
  const rgb = parseColor(color);
  if (!rgb) return null;
  return rgbToHSL(rgb);
}

/**
 * Check if hue is within a range (handles wrap-around for red)
 */
export function isHueInRange(hue: number, min: number, max: number): boolean {
  // Normalize hue to 0-360
  hue = ((hue % 360) + 360) % 360;

  // Handle wrap-around (e.g., red: 340-20)
  if (min > max) {
    return hue >= min || hue <= max;
  }
  return hue >= min && hue <= max;
}

/**
 * Get luminance category
 */
export function getLuminanceCategory(l: number): 'black' | 'dark' | 'medium' | 'light' | 'white' {
  if (l < 0.1) return 'black';
  if (l < 0.3) return 'dark';
  if (l < 0.7) return 'medium';
  if (l < 0.9) return 'light';
  return 'white';
}

/**
 * Extract color value from CSS for a property
 * e.g., extractCSSColor(css, 'background') finds background:#xxx or background-color:#xxx
 */
export function extractCSSColor(css: string, property: string): string | null {
  // Try exact property match first
  const patterns = [
    new RegExp(`${property}\\s*:\\s*([^;{}]+)`, 'i'),
    new RegExp(`${property}-color\\s*:\\s*([^;{}]+)`, 'i'),
  ];

  for (const pattern of patterns) {
    const match = css.match(pattern);
    if (match) {
      const value = match[1].trim();
      // Skip gradients, inherit, etc.
      if (value.includes('gradient') || value === 'inherit' || value === 'transparent') {
        continue;
      }
      // Extract first color if there are multiple values (e.g., "red 0 0 5px")
      const colorMatch = value.match(/(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)|[a-z]+)/i);
      if (colorMatch) {
        return colorMatch[1];
      }
    }
  }

  return null;
}

/**
 * Extract color for a specific CSS selector
 */
export function extractSelectorColor(css: string, selector: string, property: string): string | null {
  // Find the selector block
  const selectorPattern = new RegExp(`${selector.replace('.', '\\.')}\\s*\\{([^}]+)\\}`, 'i');
  const match = css.match(selectorPattern);

  if (match) {
    const block = match[1];
    return extractCSSColor(block, property);
  }

  return null;
}


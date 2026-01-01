/**
 * Simple utility for conditionally joining class names.
 * Filters out falsy values and joins with spaces.
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default cn;


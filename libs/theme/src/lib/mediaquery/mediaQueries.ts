export interface Breakpoint {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const unit = 'px';
const step = 5;

export const values: Breakpoint = {
  xs: 0, // phone
  sm: 600, // tablet
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screen
};

export default function createBreakPoints() {
  const keys = Object.keys(values);

  function up(key: BreakpointKey) {
    return `@media (min-width:${values[key]}${unit})`;
  }

  function down(key: BreakpointKey) {
    return `@media (max-width:${values[key] - step / 100}${unit})`;
  }

  function between(start: BreakpointKey, end: BreakpointKey) {
    return (
      `@media (min-width:${values[start]}${unit}) and ` +
      `(max-width:${values[end] - step / 100}${unit})`
    );
  }

  function only(key: BreakpointKey) {
    if (keys.indexOf(key) + 1 < keys.length) {
      const nextBreakpoint = keys[keys.indexOf(key) + 1] as BreakpointKey;
      return between(key, nextBreakpoint);
    }
    return up(key);
  }

  function not(key: BreakpointKey) {
    const keyIndex = keys.indexOf(key);

    if (keyIndex === 0) {
      return up('xs');
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex] as BreakpointKey);
    }

    return between(key, keys[keyIndex + 1] as BreakpointKey).replace(
      '@media',
      '@media not all and'
    );
  }
  return {
    up,
    down,
    between,
    only,
    not
  };
}

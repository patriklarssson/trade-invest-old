import createBreakPoints from './mediaquery/mediaQueries';
import { lightPalette } from './pallete/palette';
import { shadow } from './shadows/shadows';
import { spacing } from './spacing/spacing';
import { typography } from './typography';
import { fontWeight } from './typography/fontWeight';
import { zIndex } from './zIndex/zIndex';

export const theme = [
  {
    name: 'Light theme',
    breakpoint: {
      ...createBreakPoints(),
    },
    palette: lightPalette,
    spacing: spacing,
    shape: {
      borderRadius: 4,
    },
    border: {
      default: 3
    },
    shadows: shadow,
    typography: {
      ...typography,
      ...fontWeight
    },
    zIndex: zIndex,
  },
];

export type CustomTheme = typeof theme[0];
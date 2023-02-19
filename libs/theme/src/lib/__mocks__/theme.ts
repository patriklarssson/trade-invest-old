import createBreakPoints from '../mediaquery/__mocks__/mediaQueries';
import { palette } from '../pallete/__mocks__/palette';
import { shadow } from '../shadows/__mocks__/shadows';
import { spacing } from '../spacing/__mocks__/spacing';
import { CustomTheme } from '../theme';
import { typography } from '../typography/__mocks__';
import { zIndex } from '../zIndex/__mocks__/zIndex';

export const theme: CustomTheme[] = [
  {
    name: 'Mock theme',
    breakpoint: {
      ...createBreakPoints(),
    },
    palette: palette,
    spacing: spacing,
    shape: {
      borderRadius: 4,
    },
    border: {
      default: 3,
    },
    shadows: shadow,
    typography: typography,
    zIndex: zIndex,
  },
];

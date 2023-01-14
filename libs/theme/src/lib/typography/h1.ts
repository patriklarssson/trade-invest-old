import createBreakPoints from '../breakpoint/mediaQueries';
import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

const breakpoint = createBreakPoints();

export const h1 = {
  fontWeight: fontWeight.fontWeightLight,
  fontSize: 56,
  letterSpacing: '-0.01562em',
  lineHeight: 1.167,

  [breakpoint.up('sm')]: {
    fontSize: 75,
  },
  [breakpoint.up('md')]: {
    fontSize: 85,
  },
  [breakpoint.up('lg')]: {
    fontSize: 95,
  },
};

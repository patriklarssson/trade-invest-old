import createBreakPoints from '../mediaquery/mediaQueries';
import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

const breakpoint = createBreakPoints();

export const h3: ITypographyBase = {
  fontWeight: fontWeight.fontWeightRegular,
  fontSize: 32,
  letterSpacing: 0,
  lineHeight: 1.167,

  [breakpoint.up('sm')]: {
    fontSize: 41,
  },
  [breakpoint.up('md')]: {
    fontSize: 45,
  },
  [breakpoint.up('lg')]: {
    fontSize: 48,
  },
};

import createBreakPoints from '../mediaquery/mediaQueries';
import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

const breakpoint = createBreakPoints();

export const h5: ITypographyBase = {
  fontWeight: fontWeight.fontWeightRegular,
  fontSize: 20,
  letterSpacing: 0,
  lineHeight: 1.334,

  [breakpoint.up('sm')]: {
    fontSize: 21,
  },
  [breakpoint.up('md')]: {
    fontSize: 24,
  },
};
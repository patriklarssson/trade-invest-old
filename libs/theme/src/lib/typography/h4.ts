import createBreakPoints from '../breakpoint/mediaQueries';
import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

const breakpoint = createBreakPoints();

export const h4: ITypographyBase = {
  fontWeight: fontWeight.fontWeightRegular,
  fontSize: 25,
  letterSpacing: '0.00735em',
  lineHeight: 1.235,

  [breakpoint.up('sm')]: {
    fontSize: 29,
  },
  [breakpoint.up('md')]: {
    fontSize: 32,
  },
};
import createBreakPoints from '../breakpoint/mediaQueries';
import { fontWeight } from './fontWeight';

const breakpoint = createBreakPoints();

export const h2 = {
  fontWeight: fontWeight.fontWeightLight,
  fontSize: 38,
  letterSpacing: "-0.00833em",
  lineHeight: 1.2,

  [breakpoint.up('sm')]: {
    fontSize: 50,
  },
  [breakpoint.up('md')]: {
    fontSize: 53,
  },
  [breakpoint.up('lg')]: {
    fontSize: 60,
  },
};

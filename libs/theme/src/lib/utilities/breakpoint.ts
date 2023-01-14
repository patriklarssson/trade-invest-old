import { BreakpointKey } from '../breakpoint/mediaQueries';
import { theme } from '../theme';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';

type ExtractGeneric<Type> = Type extends WithBreakpoint<infer X> ? X : Type;

export const handleBreakpoints = <T>(
  breakpointProp: WithBreakpoint<T> | T,
  propValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
) => {
  if (!isWithBreakpoints(breakpointProp)) return propValue(breakpointProp);

  const { breakpoint } = theme[0];

  const stylePerBreakpoint = Object.entries(breakpointProp).map(
    ([bp, value]) => {
      return {
        [breakpoint.up(bp as BreakpointKey)]: {
          ...propValue(value),
        },
      };
    }
  );

  return Object.assign({}, ...stylePerBreakpoint);
};

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const { xs, sm, md, lg, xl } = styled as WithBreakpoint<T>;
  return Boolean(xs || sm || md || lg || xl);
}

import { BreakpointKey } from '../breakpoint/mediaQueries';
import { theme } from '../theme';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';

type ExtractGeneric<Type> = Type extends WithBreakpoint<infer X> ? X : Type;

const getRegularStyles = <T>(styleProps: WithBreakpoint<T> | T) => {
  if (styleProps && typeof styleProps === 'object') {
    const regularStyles = Object.entries(styleProps).filter(
      ([_, value]) => !isWithBreakpoints(value)
    );
    return regularStyles.reduce((acc, [cssProperty, value]) => {
      acc[cssProperty as keyof T] = value;
      return acc;
    }, {} as { [P in keyof T]: T[P] });
  }
  return {};
};

const getStylesWithBreakpoints = <T>(styleProps: WithBreakpoint<T> | T) => {
  if (styleProps && typeof styleProps === 'object')
    return (styleProps = Object.entries(styleProps)
      .filter(([_, value]) => isWithBreakpoints(value))
      .reduce((acc, [cssProperty, breakpoints]) => {
        Object.entries(breakpoints).forEach(([breakpoint, value]) => {
          acc[breakpoint as keyof T] = {
            ...acc[breakpoint as keyof T],
            [cssProperty]: value,
          };
        });
        return acc;
      }, {} as { [P in keyof T]: T[P] }));
};

export const handleBreakpoints = <T>(
  styleProps: WithBreakpoint<T> | T,
  callbackStyleValue: (prop: ExtractGeneric<T> | T) => CSS.Properties
) => {
  const { breakpoint } = theme[0];

  if (typeof styleProps !== 'object') return callbackStyleValue(styleProps);

  const regularStyles = getRegularStyles(styleProps);
  const breakpointStyles = getStylesWithBreakpoints(styleProps);


  // TODO fix type on breakpoint props
  const breakpointCSS = Object.entries(breakpointStyles ?? {}).reduce(
    (acc, [bp, value]) => {
      acc[breakpoint.up(bp as BreakpointKey)] = callbackStyleValue(
        value as ExtractGeneric<T>
      );
      return acc;
    },
    {} as { [key: string]: unknown }
  );

  // type BreakpointCSS = Record<BreakpointKey, CSS.Properties>;

  // const breakpointCSS: BreakpointCSS = Object.entries(
  //   breakpointStyles ?? {}
  // ).reduce((acc, [bp, value]) => {
  //   acc[breakpoint.up(bp)] = callbackStyleValue(
  //     value as ExtractGeneric<T>
  //   );
  //   return acc;
  // }, {} as BreakpointCSS);

  const css = Object.fromEntries(
    Object.entries(callbackStyleValue(regularStyles as T)).filter(
      ([_, value]) => value != null
    )
  )

  return Object.assign({}, css, breakpointCSS);
};

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const { xs, sm, md, lg, xl } = styled as WithBreakpoint<T>;
  return Boolean(xs || sm || md || lg || xl);
}

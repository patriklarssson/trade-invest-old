import { BreakpointKey } from '../breakpoint/mediaQueries';
import { theme } from '../theme';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';
import { Theme, useTheme } from '@emotion/react';

type ExtractFromBreakpoint<T> = T extends WithBreakpoint<infer X> ? X : T;
type ExtractGenericObject<T> = { [P in keyof T]: ExtractFromBreakpoint<T[P]> };

const seperateStyles = <T>(styleProps: WithBreakpoint<T> | T) => {
  if (!styleProps || typeof styleProps !== 'object') {
    return {
      breakpointStyles: {} as WithBreakpoint<ExtractGenericObject<T>>,
      regularStyles: {} as ExtractGenericObject<T>,
    };
  }
  return Object.entries(styleProps).reduce(
    (acc, [key, value]) => {
      if (isWithBreakpoints(value)) {
        Object.entries(value).forEach(([breakpoint, val]) => {
          acc.breakpointStyles[breakpoint] = {
            ...acc.breakpointStyles[breakpoint],
            [key]: val,
          };
        });
      } else {
        acc.regularStyles = { ...acc.regularStyles, [key]: value };
      }
      return acc;
    },
    {
      breakpointStyles: {} as WithBreakpoint<ExtractGenericObject<T>>,
      regularStyles: {} as ExtractGenericObject<T>,
    }
  );
};

type Test<T> = { [P in keyof CSS.Properties]: T };

export const handleBreakpoints = <T>(
  theme: Theme,
  styleProps: Test<WithBreakpoint<T> | T> | T,
  // styleProps: WithBreakpoint<T> | T,
  callbackStyleValue: (prop: ExtractGenericObject<T>) => CSS.Properties
) => {
  if (typeof styleProps !== 'object')
    return callbackStyleValue(styleProps as ExtractGenericObject<T>);

  const { breakpoint } = theme;
  const { breakpointStyles, regularStyles } = seperateStyles(styleProps);

  const breakpointCSS = Object.entries(breakpointStyles).reduce(
    (acc, [bp, value]) => {
      if (isBreakpointKey(bp)) {
        acc[breakpoint.up(bp)] = Object.fromEntries(
          Object.entries(callbackStyleValue(value)).filter(
            ([_, style]) => style !== undefined && !style.includes('undefined')
          )
        );
      }
      return acc;
    },
    {} as any
  );

  const css = Object.fromEntries(
    Object.entries(
      callbackStyleValue(regularStyles as ExtractGenericObject<T>)
    ).filter(([_, style]) => {
      return style !== undefined && !style.includes('undefined');
    })
  );

  const filteredObject = Object.fromEntries(
    Object.entries(Object.assign({}, css, breakpointCSS)).filter(
      ([key, value]) => {
        return Object.keys(value).length !== 0;
      }
    )
  );

  return filteredObject;
};

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const bp = styled as WithBreakpoint<T>;
  return Boolean(bp?.xs || bp?.sm || bp?.md || bp?.lg || bp?.xl);
}

function isBreakpointKey(value: string): value is BreakpointKey {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
}

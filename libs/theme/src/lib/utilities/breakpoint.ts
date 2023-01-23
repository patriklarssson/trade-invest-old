import { BreakpointKey } from '../breakpoint/mediaQueries';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';
import { Theme } from '@emotion/react';

/**
 * Extracts the type T from WithBreakpoint<T>
 */
type ExtractFromBreakpoint<T> = T extends WithBreakpoint<infer X> ? X : T;
/**
 * Extracts the type T from an object of type { [P in keyof T]: T }
 */
type ExtractGenericObject<T> = { [P in keyof T]: ExtractFromBreakpoint<T[P]> };
/**
 * Type that represents CSS properties along with a responsive design pattern using `WithBreakpoint<T>`
 */
type StyledProperties = {
  [P in keyof CSS.Properties]:
    | WithBreakpoint<CSS.Properties[P]>
    | CSS.Properties[P];
};

/**
 * @param theme The theme object containing breakpoint information
 * @param styleProps An object of type `StyledProperties` or `T`
 * @param callbackStyleValue A callback function that takes in a `T` and returns a `CSS.Properties`
 * @returns A filtered object of type `CSS.Properties`
 */
export const handleBreakpoints = <T>(
  theme: Theme,
  styleProps: StyledProperties | T,
  callbackStyleValue: (prop: ExtractGenericObject<T>) => CSS.Properties
) => {
  console.log('styleProps', styleProps);
  console.log('callbackStyleValue(styleProps)', callbackStyleValue(styleProps));

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

  console.log(filteredObject);

  return filteredObject as { [key: string]: any };
};

/**
 * @param styleProps An object of type `WithBreakpoint<T>` or `T`
 * @returns An object containing two fields `breakpointStyles` and `regularStyles`
 */
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

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const bp = styled as WithBreakpoint<T>;
  return Boolean(bp?.xs || bp?.sm || bp?.md || bp?.lg || bp?.xl);
}

function isBreakpointKey(value: string): value is BreakpointKey {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
}

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

type StyledMediaQuery = {
  [key: string]: {
    [P in keyof CSS.Properties]: CSS.Properties[P];
  };
};

type JssStyle =
  | (StyledMediaQuery | CSS.Properties)
  | (StyledMediaQuery & CSS.Properties);

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
): JssStyle => {

  if (isGenericStyle(styleProps)) return callbackStyleValue(styleProps);

  const mappedStyles = new MappedStyles(theme, styleProps as StyledProperties);

  const css = mappedStyles.css<T>(callbackStyleValue);
  const breakpointCSS = mappedStyles.breakpointCSS<T>(callbackStyleValue)

  return {...css, ...breakpointCSS};
};

class MappedStyles {
  theme: Theme;
  breakpointStyles: WithBreakpoint<CSS.Properties>;
  regularStyles: CSS.Properties;
  constructor(theme: Theme, props: StyledProperties) {
    this.theme = theme;
    this.regularStyles = {};
    this.breakpointStyles = {};

    Object.entries(props).forEach(([key, value]) => {
      if (value && !isWithBreakpoints(value))
        this.regularStyles = { ...this.regularStyles, [key]: value };
      else if (value && isWithBreakpoints(value)) {
        Object.entries(value).forEach(([breakpoint, val]) => {
          if (isBreakpointKey(breakpoint))
            this.breakpointStyles[breakpoint] = {
              ...this.breakpointStyles[breakpoint],
              [key]: val,
            };
        });
      }
    });
  }

  css = <T>(
    callbackStyleValue: (val: ExtractGenericObject<T>) => CSS.Properties
  ): CSS.Properties => {
    return Object.fromEntries(
      Object.entries(
        callbackStyleValue(this.regularStyles as ExtractGenericObject<T>)
      ).filter(
        ([_, style]) => style !== undefined && !style.includes('undefined')
      )
    );
  };

  breakpointCSS = <T>(
    callbackStyleValue: (val: ExtractGenericObject<T>) => CSS.Properties
  ) => {
    const { breakpoint } = this.theme;
    return Object.entries(this.breakpointStyles).reduce((acc, [bp, value]) => {
      if (isBreakpointKey(bp)) {
        acc[breakpoint.up(bp)] = Object.fromEntries(
          Object.entries(
            callbackStyleValue(value as ExtractGenericObject<T>)
          ).filter(
            ([_, style]) => style !== undefined && !style.includes('undefined')
          )
        );
      }
      return acc;
    }, {} as { [key: string]: CSS.Properties });
  };
}

function isWithBreakpoints<T>(
  styled: WithBreakpoint<T> | T
): styled is WithBreakpoint<T> {
  const bp = styled as WithBreakpoint<T>;
  return Boolean(bp?.xs || bp?.sm || bp?.md || bp?.lg || bp?.xl);
}

function isBreakpointKey(value: string): value is BreakpointKey {
  return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
}

function isGenericStyle<T>(
  value: StyledProperties | T
): value is ExtractGenericObject<T> {
  return typeof value !== 'object';
}

import { BreakpointKey } from '../breakpoint/mediaQueries';
import { WithBreakpoint } from '../types/cssProperties';
import type * as CSS from 'csstype';
import { Theme } from '@emotion/react';

/**
 * `ExtractFromBreakpoint<T>` is a utility type that, given a type `T`, returns the type of the value
 * wrapped in a `WithBreakpoint<X>` type, where `X` is the extracted type. If `T` is not of type
 * `WithBreakpoint<X>`, the original type `T` is returned.
 *
 * @example
 * type Example = WithBreakpoint<string>;
 * ExtractFromBreakpoint<Example> // string
 * ExtractFromBreakpoint<string> // string
 */
type ExtractFromBreakpoint<T> = T extends WithBreakpoint<infer X> ? X : T;

/**
 * `ExtractGenericObject<T>` is a utility type that, given a type `T`, returns a new type where each
 * property has been mapped through the `ExtractFromBreakpoint<T[P]>` type.
 *
 * @example
 * type Example = { a: WithBreakpoint<string>, b: number };
 * ExtractGenericObject<Example> // { a: string, b: number }
 */
type ExtractGenericObject<T> = { [P in keyof T]: ExtractFromBreakpoint<T[P]> };

/**
 * `StyledProperties` is a type that defines an object where each property key is a key from the
 * `CSS.Properties` type, and the value can be either a `WithBreakpoint<CSS.Properties[P]>` or a
 * `CSS.Properties[P]`.
 *
 * @example
 * type Example = StyledProperties;
 * Example = {
 *  color: 'red',
 *  background: WithBreakpoint<'blue'>
 * }
 */
type StyledProperties = {
  [P in keyof CSS.Properties]:
    | WithBreakpoint<CSS.Properties[P]>
    | CSS.Properties[P];
};

/**
 * `StyledMediaQuery` is a type that defines an object where each property key is a string,
 * and the value is an object where each property key is a key from the `CSS.Properties` type,
 * and the value is `CSS.Properties[P]`
 *
 * @example
 * type Example = StyledMediaQuery;
 * Example = {
 *  '@media (min-width: 600px)': {
 *    color: 'red',
 *    background: 'blue'
 *  }
 * }
 */
type StyledMediaQuery = {
  [key: string]: {
    [P in keyof CSS.Properties]: CSS.Properties[P];
  };
};

/**
 * `JssStyle` is a type that describes a union between
 * `(StyledMediaQuery | CSS.Properties)` or `(StyledMediaQuery & CSS.Properties)`
 *
 * @example
 * type Example = JssStyle;
 * Example = {
 *   color: 'red',
 *   background: 'blue',
 *   '@media (min-width: 600px)': {
 *     color: 'green'
 *   }
 * }
 */
type JssStyle =
  | (StyledMediaQuery | CSS.Properties)
  | (StyledMediaQuery & CSS.Properties);

/**
*`handleBreakpoints` is a utility function that takes in a `theme`, `styleProps`, and a `callbackStyleValue` function.
*It returns a `JssStyle` object that contains the resulting styles from the `callbackStyleValue` function.
*@param {Theme} theme The theme object that contains breakpoint information.
*@param {StyledProperties | T} styleProps A StyledProperties object that contains the styles to be mapped,
*or a generic object T that will be passed to the callbackStyleValue function.
*@param {(prop: ExtractGenericObject<T>) => CSS.Properties} callbackStyleValue A callback function that takes in an
*ExtractGenericObject<T> object and returns the resulting CSS.Properties object.
*@returns {JssStyle} A JssStyle object that contains the resulting styles from the callbackStyleValue function.
* @example
*   // Will result in {backgroundColor: "red"} style being added to the component
*   const Component = styled.div(({theme}) => ({
*    ...handleBreakpoints(theme, "red", (color) => ({backgroundColor: color}))
*  }))
* @example
*  // Will result in {display: "flex", flexDirection: 'column'} styles being added to the component
*  const Component = styled.div(({theme}) => ({
*    ...handleBreakpoints(theme, {display: "flex", flexDirection: 'column'}, ({display, flexDirection}) => ({display, flexDirection}))
*  }))
* @example
* // Will result in {backgroundColor: "red"} for Mediaquery md and up, end then switch to blue for lg and up
*   const Component = styled.div(({theme}) => ({
*    ...handleBreakpoints(theme, {backgroundColor: {md: "red", lg: "blue"}}, ({backgroundColor}) => ({backgroundColor}))
*  }))
*/
export const handleBreakpoints = <T>(
  theme: Theme,
  styleProps: StyledProperties | T,
  callbackStyleValue: (prop: ExtractGenericObject<T>) => CSS.Properties
): JssStyle => {
  if (isGenericStyle(styleProps)) return callbackStyleValue(styleProps);

  const mappedStyles = new MappedStyles(theme, styleProps as StyledProperties);

  const css = mappedStyles.css<T>(callbackStyleValue);
  const breakpointCSS = mappedStyles.breakpointCSS<T>(callbackStyleValue);

  console.log(css);
  console.log(breakpointCSS);


  return { ...css, ...breakpointCSS };
};

/**
 *  MappedStyles class is responsible for mapping the styles passed in props.
 *  It separates the styles into regularStyles and breakpointStyles.
 * @class MappedStyles
 * @param {Theme} theme Theme object that contains breakpoints
 * @param {StyledProperties} props Styles passed as an object
 */
class MappedStyles {
  theme: Theme;
  breakpointStyles: WithBreakpoint<CSS.Properties>;
  regularStyles: CSS.Properties;
  constructor(theme: Theme, props: StyledProperties) {
    this.theme = theme;
    this.regularStyles = {};
    this.breakpointStyles = {};

    Object.entries(props).forEach(([key, value]) => {
      if (value && !this.isWithBreakpoints(value))
        this.regularStyles = { ...this.regularStyles, [key]: value };
      else if (value && this.isWithBreakpoints(value)) {
        Object.entries(value).forEach(([breakpoint, val]) => {
          if (this.isBreakpointKey(breakpoint))
            this.breakpointStyles[breakpoint] = {
              ...this.breakpointStyles[breakpoint],
              [key]: val,
            };
        });
      }
    });
  }

  /**
   *  css method returns the regular styles that have been processed by the callback
   * @param { (val: ExtractGenericObject<T>) => CSS.Properties } callbackStyleValue Function that processes the styles
   * @returns {CSS.Properties}
   * @example return { paddingTop: "20px", paddingBottom: "10px" }
   *
   */
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

  /**
   *  breakpointCSS method returns the breakpoint styles that have been processed by the callback
   * @param { (val: ExtractGenericObject<T>) => CSS.Properties } callbackStyleValue Function that processes the styles
   * @returns { { [key: string]: CSS.Properties } }
   * @example
   * return {
    * "@media (min-width:0px)": {paddingTop: "20px", paddingBottom: "10px"},
    * "@media (min-width:900px)": {paddingTop: "20px", paddingBottom: "10px"}
   *  }
   */
  breakpointCSS = <T>(
    callbackStyleValue: (val: ExtractGenericObject<T>) => CSS.Properties
  ) => {
    const { breakpoint } = this.theme;
    return Object.entries(this.breakpointStyles).reduce((acc, [bp, value]) => {
      if (this.isBreakpointKey(bp)) {
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

  /**
   *  isWithBreakpoints method check if passed style has breakpoints
   * @param {WithBreakpoint<T> | T} styled Style that needs to be checked
   * @returns {styled is WithBreakpoint<T>}
   */
  private isWithBreakpoints<T>(
    styled: WithBreakpoint<T> | T
  ): styled is WithBreakpoint<T> {
    const bp = styled as WithBreakpoint<T>;
    return Boolean(bp?.xs || bp?.sm || bp?.md || bp?.lg || bp?.xl);
  }

  /**
   *  isBreakpointKey method check if passed value is valid breakpoint key
   * @param {string} value Value that needs to be checked
   * @returns {value is BreakpointKey}
   */
  private isBreakpointKey(value: string): value is BreakpointKey {
    return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
  }
}

/**
@function isGenericStyle
Determines if the value passed is a plain object or not.
@param {StyledProperties | T} value The value to check
@returns {value is ExtractGenericObject<T>} A boolean indicating whether the passed value is a plain object or not
*/
function isGenericStyle<T>(
  value: StyledProperties | T
): value is ExtractGenericObject<T> {
  return typeof value !== 'object';
}

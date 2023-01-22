import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IBorderProps {
  /**
   * The border width in pixels. Can be a number, boolean or an object with breakpoints.
   * When set as a boolean, it will use the default border width from the theme.
   */
  border: number | boolean | WithBreakpoint<number>;

  /**
   * The border top width in pixels. Can be an object with breakpoints.
   */
  borderTop: number | WithBreakpoint<number>;

  /**
   * The border right width in pixels. Can be an object with breakpoints.
   */
  borderRight: number | WithBreakpoint<number>;

  /**
   * The border bottom width in pixels. Can be an object with breakpoints.
   */
  borderBottom: number | WithBreakpoint<number>;

  /**
   * The border left width in pixels. Can be an object with breakpoints.
   */
  borderLeft: number | WithBreakpoint<number>;

  /**
   * The border style. Can be an object with breakpoints.
   */
  borderStyle:
    | CSS.Property.BorderStyle
    | WithBreakpoint<CSS.Property.BorderStyle>;

  /**
   * The border radius. Can be a number, a string or an object with breakpoints.
   * When set as a number, it will be multiplied by the default border radius from the theme.
   */
  borderRadius: number | string | WithBreakpoint<number | string>;

  /**
   * The border color.
   */
  borderColor: string;
}

/**
Higher-Order Component that adds border to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IBorderProps>): JSX.Element} - A higher-order component that adds border to a wrapped component.
 */
const withBorder = <T,>(WrappedComponent: ComponentType<T>) => {
  const BorderHoc = styled(WrappedComponent)<Partial<IBorderProps> & T>(
    ({
      theme,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderStyle,
      borderRadius,
      borderColor = theme.palette.common.black,
    }) => ({
      ...handleBreakpoints(
        theme,
        {
          border,
          borderTop,
          borderRight,
          borderBottom,
          borderLeft,
          borderStyle,
          borderRadius,
          borderColor,
        },
        ({
          border,
          borderTop,
          borderRight,
          borderBottom,
          borderLeft,
          borderStyle,
          borderRadius,
          borderColor,
        }) => {
          const styles: any = {
            border: border,
            borderStyle: borderStyle,
            borderRadius: borderRadius,
            borderColor: borderColor,
            borderTop: `${borderTop}px solid`,
            borderRight: `${borderRight}px solid`,
            borderBottom: `${borderBottom}px solid`,
            borderLeft: `${borderLeft}px solid`,
          };

          if (border) {
            if (typeof border === 'boolean')
              styles.border = `${theme.border.default}px solid`;
            else styles.border = `${border}px solid`;
          }

          if (borderRadius) {
            if (typeof borderRadius === 'number')
              styles.borderRadius = `${theme.shape.borderRadius * borderRadius}px`;
            else styles.borderRadius = borderRadius
          }

          return styles;
        }
      ),
    })
  );
  return (props: T & Partial<IBorderProps>) => {
    return <BorderHoc {...props} />;
  };
};

export default withBorder;

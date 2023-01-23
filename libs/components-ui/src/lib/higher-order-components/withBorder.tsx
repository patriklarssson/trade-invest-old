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
   * The border radius. Can be a number, a string or an object with breakpoints.
   * When set as a number, it will be multiplied by the default border radius from the theme.
   */
  borderRadius: number | string | WithBreakpoint<number | string>;

  /**
   * The border style. Can be an object with breakpoints.
   */
  borderStyle: CSS.Property.BorderStyle;

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
      borderRadius,
      borderStyle = 'solid',
      borderColor = theme.palette.common.black,
    }) => {
      if (border || borderTop || borderRight || borderBottom || borderLeft)
        return {
          ...handleBreakpoints(
            theme,
            {
              border,
              borderTop,
              borderRight,
              borderBottom,
              borderLeft,
              borderRadius,
            },
            ({
              border,
              borderTop,
              borderRight,
              borderBottom,
              borderLeft,
              borderRadius,
            }) => {
              if (typeof border === 'boolean') border = theme.border.default;

              if (typeof borderRadius === 'number')
                borderRadius = `${theme.shape.borderRadius * borderRadius}px`;

              return {
                border: `${border}px ${borderStyle}`,
                borderTop: `${borderTop}px ${borderStyle}`,
                borderRight: `${borderRight}px ${borderStyle}`,
                borderBottom: `${borderBottom}px ${borderStyle}`,
                borderLeft: `${borderLeft}px ${borderStyle}`,
                borderRadius,
                borderColor,
              };
            }
          ),
        };
      return {};
    }
  );
  return (props: T & Partial<IBorderProps>) => {
    return <BorderHoc {...props} />;
  };
};

export default withBorder;

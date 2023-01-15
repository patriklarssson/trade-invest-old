import styled from '@emotion/styled';
import {
  Spacing,
  WithBreakpoint,
  handleBreakpoints,
} from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IMarginProps {
  /**
   * Margin property. Can be an object with breakpoints.
   */
  m: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Top property. Can be an object with breakpoints.
   */
  mt: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Right property. Can be an object with breakpoints.
   */
  mr: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Bottom property. Can be an object with breakpoints.
   */
  mb: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Left property. Can be an object with breakpoints.
   */
  ml: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Right and Left property. Can be an object with breakpoints.
   */
  mx: Spacing | WithBreakpoint<Spacing>;
  /**
   * Margin Top and Bottom property. Can be an object with breakpoints.
   */
  my: Spacing | WithBreakpoint<Spacing>;
}

/**
Higher-Order Component that adds margin to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IMarginProps>): JSX.Element} - A higher-order component that adds margin to a wrapped component.
 */
const withMargin = <T,>(WrappedComponent: ComponentType<T>) => {
  const MarginHoc = styled(WrappedComponent)<Partial<IMarginProps> & T>(
    ({ theme, m, mt, mr, mb, ml, mx, my }) => ({
      ...(m && {
        ...handleBreakpoints(m, (propValue) => ({
          margin: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(mt && {
        ...handleBreakpoints(mt, (propValue) => ({
          marginTop: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(mr && {
        ...handleBreakpoints(mr, (propValue) => ({
          marginRight: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(mb && {
        ...handleBreakpoints(mb, (propValue) => ({
          marginBottom: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(ml && {
        ...handleBreakpoints(ml, (propValue) => ({
          marginLeft: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(mx && {
        ...handleBreakpoints(mx, (propValue) => ({
          marginRight: `${theme.spacing(propValue)}px`,
          marginLeft: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(my && {
        ...handleBreakpoints(my, (propValue) => ({
          marginTop: `${theme.spacing(propValue)}px`,
          marginBottom: `${theme.spacing(propValue)}px`,
        })),
      }),
    })
  );
  return (props: T & Partial<IMarginProps>) => {
    return <MarginHoc {...props} />;
  };
};

export default withMargin;

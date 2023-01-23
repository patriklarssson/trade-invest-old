import styled from '@emotion/styled';
import {
  Spacing,
  WithBreakpoint,
  handleBreakpoints,
} from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IPaddingProps {
  /**
   * Padding property. Can be an object with breakpoints.
   */
  p: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Top property. Can be an object with breakpoints.
   */
  pt: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Right property. Can be an object with breakpoints.
   */
  pr: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Bottom property. Can be an object with breakpoints.
   */
  pb: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Left property. Can be an object with breakpoints.
   */
  pl: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Right and Left property. Can be an object with breakpoints.
   */
  px: Spacing | WithBreakpoint<Spacing>;
  /**
   * Padding Top and Bottom property. Can be an object with breakpoints.
   */
  py: Spacing | WithBreakpoint<Spacing>;
}

/**
Higher-Order Component that adds padding to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IPaddingProps>): JSX.Element} - A higher-order component that adds padding to a wrapped component.
 */
const withPadding = <T,>(WrappedComponent: ComponentType<T>) => {
  const PaddingHoc = styled(WrappedComponent)<Partial<IPaddingProps> & T>(
    ({ theme, p, pt, pr, pb, pl, px, py }) => ({
      ...handleBreakpoints(
        theme,
        { p, pt, pr, pb, pl, px, py },
        ({ p, pt, pr, pb, pl, px, py }) => {
          if (px) {
            pr = px;
            pl = px;
          }
          if (py) {
            pt = py;
            pb = py;
          }
          return {
            paddingTop: `${theme.spacing(pt)}px`,
            paddingRight: `${theme.spacing(pr)}px`,
            paddingBottom: `${theme.spacing(pb)}px`,
            paddingLeft: `${theme.spacing(pl)}px`,
            padding: `${theme.spacing(p)}px`,
          };
        }
      ),
    })
  );
  return (props: T & Partial<IPaddingProps>) => {
    return <PaddingHoc {...props} />;
  };
};

export default withPadding;

import styled from '@emotion/styled';
import {
  Spacing,
  WithBreakpoint,
  handleBreakpoints,
} from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IPaddingProps {
  p: Spacing | WithBreakpoint<Spacing>;
  pt: Spacing | WithBreakpoint<Spacing>;
  pr: Spacing | WithBreakpoint<Spacing>;
  pb: Spacing | WithBreakpoint<Spacing>;
  pl: Spacing | WithBreakpoint<Spacing>;
  px: Spacing | WithBreakpoint<Spacing>;
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
      ...(p && {
        ...handleBreakpoints(p, (propValue) => ({
          padding: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(pt && {
        ...handleBreakpoints(pt, (propValue) => ({
          paddingTop: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(pr && {
        ...handleBreakpoints(pr, (propValue) => ({
          paddingRight: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(pb && {
        ...handleBreakpoints(pb, (propValue) => ({
          paddingBottom: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(pl && {
        ...handleBreakpoints(pl, (propValue) => ({
          paddingLeft: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(px && {
        ...handleBreakpoints(px, (propValue) => ({
          paddingRight: `${theme.spacing(propValue)}px`,
          paddingLeft: `${theme.spacing(propValue)}px`,
        })),
      }),
      ...(py && {
        ...handleBreakpoints(py, (propValue) => ({
          paddingTop: `${theme.spacing(propValue)}px`,
          paddingBottom: `${theme.spacing(propValue)}px`,
        })),
      }),
    })
  );
  return (props: T & Partial<IPaddingProps>) => {
    return <PaddingHoc {...props} />;
  };
};

export default withPadding;

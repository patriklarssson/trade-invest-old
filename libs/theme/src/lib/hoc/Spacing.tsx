import styled from '@emotion/styled';
import { handleBreakpoints } from '../utilities/breakpoint';
import { WithBreakpoint } from '../types/cssProperties';
import { ComponentType } from 'react';
import { Spacing } from '../spacing/spacing';

interface ISpacingProps {
  p?: Spacing | WithBreakpoint<Spacing>;
  pt?: Spacing | WithBreakpoint<Spacing>;
  pr?: Spacing | WithBreakpoint<Spacing>;
  pb?: Spacing | WithBreakpoint<Spacing>;
  pl?: Spacing | WithBreakpoint<Spacing>;
  px?: Spacing | WithBreakpoint<Spacing>;
  py?: Spacing | WithBreakpoint<Spacing>;
}

const WithPadding = <T,>(WrappedComponent: ComponentType<T>) => {
  const StyledComponent = styled(WrappedComponent)<{
    ownerState: ISpacingProps;
  }>(({ theme, ownerState }) => ({
    ...(ownerState.p && {
      ...handleBreakpoints(ownerState.p, (propValue) => ({
        padding: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.pt && {
      ...handleBreakpoints(ownerState.pt, (propValue) => ({
        paddingTop: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.pr && {
      ...handleBreakpoints(ownerState.pr, (propValue) => ({
        paddingRight: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.pb && {
      ...handleBreakpoints(ownerState.pb, (propValue) => ({
        paddingBottom: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.pl && {
      ...handleBreakpoints(ownerState.pl, (propValue) => ({
        paddingLeft: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.px && {
      ...handleBreakpoints(ownerState.px, (propValue) => ({
        paddingRight: `${theme.spacing(propValue)}px`,
        paddingLeft: `${theme.spacing(propValue)}px`,
      })),
    }),
    ...(ownerState.py && {
      ...handleBreakpoints(ownerState.py, (propValue) => ({
        paddingTop: `${theme.spacing(propValue)}px`,
        paddingBottom: `${theme.spacing(propValue)}px`,
      })),
    }),
  }));
  return (props: T & ISpacingProps) => {
    return <StyledComponent {...props} ownerState={props} />;
  };
};

export default WithPadding;

import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IAlignContentProps {
  /**
   * AlignContent property. Can be an object with breakpoints.
   */
  alignContent:
    | CSS.Property.AlignContent
    | WithBreakpoint<CSS.Property.AlignContent>;
}

/**
Higher-Order Component that adds alignContent to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IAlignContentProps>): JSX.Element} - A higher-order component that adds alignContent to a wrapped component.
 */
const withAlignContent = <T,>(WrappedComponent: ComponentType<T>) => {
  const AlignContentHoc = styled(WrappedComponent)<
    Partial<IAlignContentProps> & T
  >(({ theme, alignContent }) => ({
    ...(alignContent && {
      ...handleBreakpoints(theme, { alignContent }, ({ alignContent }) => ({
        alignContent,
      })),
    }),
  }));
  return (props: T & Partial<IAlignContentProps>) => {
    return <AlignContentHoc {...props} />;
  };
};

export default withAlignContent;

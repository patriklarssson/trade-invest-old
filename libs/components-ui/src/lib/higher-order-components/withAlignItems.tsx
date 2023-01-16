import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IAlignItemsProps {
  /**
   * AlignItems property. Can be an object with breakpoints.
   */
  alignItems:
    | CSS.Property.AlignItems
    | WithBreakpoint<CSS.Property.AlignItems>;
}

/**
Higher-Order Component that adds alignItems to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IAlignItemsProps>): JSX.Element} - A higher-order component that adds alignItems to a wrapped component.
 */
const withAlignItems = <T,>(WrappedComponent: ComponentType<T>) => {
  const AlignItemsHoc = styled(WrappedComponent)<
    Partial<IAlignItemsProps> & T
  >(({ alignItems }) => ({
    ...(alignItems && {
      ...handleBreakpoints(alignItems, (propValue) => ({
        alignItems: propValue,
      })),
    }),
  }));
  return (props: T & Partial<IAlignItemsProps>) => {
    return <AlignItemsHoc {...props} />;
  };
};

export default withAlignItems;

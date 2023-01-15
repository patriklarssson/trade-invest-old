import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IDisplayProps {
  display: CSS.Property.Display | WithBreakpoint<CSS.Property.Display>;
  hidden: boolean;
}

/**
Higher-Order Component that adds padding to a wrapped component.
@param WrappedComponent - The component to wrap
@returns {function(T & Partial<IDisplayProps>): JSX.Element} - A higher-order component that adds padding to a wrapped component.
 */
const withDisplay = <T,>(WrappedComponent: ComponentType<T>) => {
  const DisplayHoc = styled(WrappedComponent)<Partial<IDisplayProps> & T>(
    ({ display, hidden }) => ({
      ...(display && {
        ...handleBreakpoints(display, (propValue) => ({
          display: propValue,
        })),
      }),
      ...(hidden && !display && {
          display: 'none',
        }),
    })
  );
  return (props: T & Partial<IDisplayProps>) => {
    return <DisplayHoc {...props} />;
  };
};

export default withDisplay;

import styled from '@emotion/styled';
import { Shadow } from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IBoxShadowProps {
  /**
   * The type of box shadow
   */
  boxShadow: Shadow;
}

/**
 * Higher-Order Component that adds box shadow to a wrapped component.
 * @param WrappedComponent - The component to wrap
 * @returns {function(T & Partial<IBoxShadowProps>): JSX.Element} - A higher-order component that adds box shadow to a wrapped component.
 */
const withBoxShadow = <T,>(WrappedComponent: ComponentType<T>) => {
  const BoxShadowHoc = styled(WrappedComponent)<Partial<IBoxShadowProps> & T>(
    ({ theme, boxShadow }) => ({
      ...((boxShadow || boxShadow === 0) && {
        boxShadow: theme.shadows(boxShadow),
      }),
    })
  );
  return (props: T & Partial<IBoxShadowProps>) => {
    return <BoxShadowHoc {...props} />;
  };
};

export default withBoxShadow;

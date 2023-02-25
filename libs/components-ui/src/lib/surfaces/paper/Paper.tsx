import styled from '@emotion/styled';
import { Shadow } from '@trade-invest/theme';
import { HTMLAttributes } from 'react';

interface IPaperProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * Amount of shadow
   * @default 1
   */
  elevation?: Shadow;
  /**
   * If `true` rounded corners are disabled
   * @default false
   */
  square?: boolean;
  /**
   * Variant to use
   * @default elevation
   */
  variant?: 'elevation' | 'outlined';
}

const PaperRoot = styled.div<{ ownerState: IPaperProps }>(
  ({ theme, ownerState }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    ...(!ownerState.square && {
      borderRadius: theme.shape.borderRadius,
    }),
    ...(ownerState.variant === 'outlined' && {
      border: `1px solid ${theme.palette.divider}`,
    }),
    ...(ownerState.variant === 'elevation' &&
      ownerState.elevation && {
        boxShadow: theme.shadows(ownerState.elevation),
      }),
  })
);

export function Paper(props: IPaperProps) {
  const {
    component = 'div',
    elevation = 1,
    square = false,
    variant = 'elevation',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    elevation,
    square,
    variant,
  };

  return <PaperRoot as={component} ownerState={ownerState} {...other} />;
}

export default Paper;

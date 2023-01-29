import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import type * as CSS from 'csstype';

interface IDividerProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  //   light?: boolean;
  /**
   * The component orientation.
   * @default horizontal
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The text alignment.
   * @default center
   */
  textAlign?: CSS.Property.TextAlign;
  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem?: boolean;
}

const DividerRoot = styled.div<{ ownerState: IDividerProps }>(
  ({ theme, ownerState }) => ({
    margin: theme.spacing(0),
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderBottomWidth: 'thin',

    ...(ownerState.orientation === 'vertical' && {
      height: '100%',
      borderBottomWidth: 0,
      borderRightWidth: 'thin',
    }),
    ...(ownerState.flexItem && {
      alignSelf: 'stretch',
      height: 'auto',
    }),

    ...(ownerState.children && {
      display: 'flex',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      border: 0,
      '&::before, &::after': {
        position: 'relative',
        width: '100%',
        borderTop: `thin solid ${theme.palette.divider}`,
        top: '50%',
        content: '""',
        transform: 'translateY(50%)',
      },
    }),

    ...(ownerState.children &&
      ownerState.orientation === 'vertical' && {
        flexDirection: 'column',
        '&::before, &::after': {
          height: '100%',
          top: '0%',
          left: '50%',
          borderTop: 0,
          borderLeft: `thin solid ${theme.palette.divider}`,
          transform: 'translateX(0%)',
          position: 'relative',
          content: "''",
        },
      }),

    ...(ownerState.textAlign === 'right' &&
      ownerState.orientation !== 'vertical' && {
        '&::before': {
          width: '90%',
        },
        '&::after': {
          width: '10%',
        },
      }),
    ...(ownerState.textAlign === 'left' &&
      ownerState.orientation !== 'vertical' && {
        '&::before': {
          width: '10%',
        },
        '&::after': {
          width: '90%',
        },
      }),
  })
);

const DividerWrapper = styled.span<{ ownerState: IDividerProps }>(
  ({ theme, ownerState }) => ({
    display: 'inline-block',
    paddingLeft: theme.spacing(2) * 1.2,
    paddingRight: theme.spacing(2) * 1.2,
    ...(ownerState.orientation === 'vertical' && {
      paddingTop: theme.spacing(2) * 1.2,
      paddingBottom: theme.spacing(2) * 1.2,
    }),
  })
);

export function Divider(props: IDividerProps) {
  const {
    children,
    component = children ? 'div' : 'hr',
    // light = false,
    orientation = 'horizontal',
    textAlign = 'center',
    flexItem = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    // light,
    orientation,
    textAlign,
    flexItem,
  };

  return (
    <DividerRoot as={component} ownerState={ownerState} {...other}>
      {children ? (
        <DividerWrapper ownerState={ownerState}>{children}</DividerWrapper>
      ) : null}
    </DividerRoot>
  );
}

export default Divider;

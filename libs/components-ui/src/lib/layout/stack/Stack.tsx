import styled from '@emotion/styled';
import {
  handleBreakpoints,
  Spacing,
  WithBreakpoint,
} from '@trade-invest/theme';
import React, { HTMLAttributes, ReactElement } from 'react';
import type * as CSS from 'csstype';

interface IStackProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode | React.ReactNode[] | JSX.Element[];
  /**
   * Defines the flex-direction.
   */
  direction?:
    | CSS.Property.FlexDirection
    | WithBreakpoint<CSS.Property.FlexDirection>;
  /**
   * Defines the justify-content
   */
  justifyContent?:
    | CSS.Property.JustifyContent
    | WithBreakpoint<CSS.Property.JustifyContent>;
  /**
   * Defines the align-items
   */
  alignItems?:
    | CSS.Property.AlignItems
    | WithBreakpoint<CSS.Property.AlignItems>;
  /**
   * Add an element between each child.
   */
  divider?: ReactElement;
  /**
   * Defines the space between each child.
   */
  spacing?: Spacing;
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
const joinChildren = (children: React.ReactNode, separator: ReactElement) => {
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output: React.ReactNode[], child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, { key: index }));
    }
    return output;
  }, []);
};

const StackRoot = styled.div<{ ownerState: IStackProps }>(
  ({
    theme,
    ownerState: { spacing, direction, justifyContent, alignItems },
  }) => ({
    display: 'flex',
    ...(spacing && {
      gap: theme.spacing(spacing),
    }),
    ...(direction && {
      ...handleBreakpoints(theme, { direction }, ({ direction }) => ({
        flexDirection: direction,
      })),
    }),
    ...(justifyContent && {
      ...handleBreakpoints(theme, { justifyContent }, ({ justifyContent }) => ({
        justifyContent: justifyContent,
      })),
      ...(alignItems && {
        ...handleBreakpoints(theme, { alignItems }, ({ alignItems }) => ({
          alignItems: alignItems,
        })),
      }),
    }),
  })
);

/**
 * TODO
 The Typography component makes it easy to apply a default set of font weights and sizes in your application.
**/
function Stack(props: IStackProps) {
  const {
    component = 'div',
    direction = 'column',
    justifyContent,
    alignItems,
    spacing = 0,
    divider,
    children,
    ...other
  } = props;

  const ownerState = {
    direction,
    spacing,
    justifyContent,
    alignItems,
  };

  return (
    <StackRoot as={component} ownerState={ownerState} {...other}>
      {divider ? joinChildren(children, divider) : children}
    </StackRoot>
  );
}

export default Stack;

import styled from '@emotion/styled';
import type * as CSS from 'csstype';
import React, { HTMLAttributes } from 'react';
import {
  withBorder,
  withBoxShadow,
  withDisplay,
  withMargin,
  withPadding,
} from '../higher-order-components';
import { compose } from '../utilities';

type VariantType =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p',
};

interface ITypographyProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Applies the theme typography styles.
   * @default body1
   */
  variant?: VariantType;
  /**
   * Set the text-align on the component.
   * @default inherit
   */
  align?: CSS.Property.TextAlign;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType;
  /**
   * Will add a gutter at the base of the component.
   * @default false
   */
  gutterBottom?: boolean;
  /**
   * Text cannot wrap itself in a newline.
   * @default false
   */
  noWrap?: boolean;
  /**
   * If `true`, the element will be a `<p>` element.
   * @default false
   */
  paragraph?: boolean;
}

const TypographyRoot = styled.span<{
  ownerState: ITypographyProps;
}>(({ theme, ownerState }) => ({
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  margin: theme.spacing(0),
  ...(ownerState.variant && {
    ...theme.typography[ownerState.variant],
  }),
  ...(ownerState.align !== 'inherit' && {
    textAlign: ownerState.align,
  }),
  ...(ownerState.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  ...(ownerState.gutterBottom && {
    marginBottom: '0.35em',
  }),
  ...(ownerState.paragraph && {
    marginBottom: theme.spacing(3),
  }),
}));

const Typography = (props: ITypographyProps) => {
  const {
    align = 'inherit',
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    ...other
  } = props;

  const ownerState = {
    ...props,
    align,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
  };

  const Component: React.ElementType =
    component ||
    (paragraph
      ? 'p'
      : (defaultVariantMapping[
          variant as keyof typeof defaultVariantMapping
        ] as React.ElementType) || 'span');

  return (
    <TypographyRoot
      as={Component}
      // ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
};

export default compose(withPadding, withMargin, withBorder, withBoxShadow, withDisplay)(Typography);

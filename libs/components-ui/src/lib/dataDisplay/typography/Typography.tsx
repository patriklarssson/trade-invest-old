import styled from '@emotion/styled';
import type * as CSS from 'csstype';
import React, { HTMLAttributes } from 'react';
import {
  withPadding,
  withMargin,
  withBorder,
  withBoxShadow,
  withDisplay,
  withColor,
  withFlexBox,
} from '../../higher-order-components';
import { ITypographyProps, defaultVariantMapping } from './TypographyProps';

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

export default withPadding(
  withMargin(
    withBorder(withBoxShadow(withDisplay(withColor(withFlexBox(Typography)))))
  )
);

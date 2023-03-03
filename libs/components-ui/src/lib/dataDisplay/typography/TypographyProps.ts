import type * as CSS from 'csstype';
import { HTMLAttributes } from 'react';

export type VariantType =
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

export const defaultVariantMapping = {
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

export interface ITypographyProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
// export interface ITypographyProps {
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
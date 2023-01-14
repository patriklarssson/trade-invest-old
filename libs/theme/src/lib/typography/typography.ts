import type * as CSS from 'csstype';

export interface ITypographyBase {
  fontWeight: CSS.Property.FontWeight;
  fontSize: CSS.Property.FontSize | number;
  letterSpacing: CSS.Property.LetterSpacing;
  lineHeight: CSS.Property.LineHeight;
  textTransform?: CSS.Property.TextTransform;
  overflow?: CSS.Property.Overflow
  textOverflow?: CSS.Property.TextOverflow
  whiteSpace?: CSS.Property.WhiteSpace
}

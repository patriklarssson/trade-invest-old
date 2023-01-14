import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

export const overline: ITypographyBase = {
    fontSize: 12,
    fontWeight: fontWeight.fontWeightRegular,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
};
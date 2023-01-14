import { fontWeight } from './fontWeight';
import { ITypographyBase } from './typography';

export const caption: ITypographyBase = {
    fontSize: 12,
    fontWeight: fontWeight.fontWeightRegular,
    letterSpacing: "0.03333em",
    lineHeight: 1.66,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
};
import { IntRange, WithBreakpoint, Spacing } from '@trade-invest/theme';
import { HTMLAttributes } from 'react';
import type * as CSS from 'csstype';

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/** Props for a Grid component, which arranges its children in a grid layout.*/
export interface IGridProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to display within the Grid.
   */
  children: React.ReactNode;

  /**
   * The number of columns to display, as a range of integers from 1 to 12. Can be specified with breakpoint-specific values.
   * @default 12
   */
  columns: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>>;

  /**
   * Whether to automatically determine the number of columns based on the available space.
   * @default false
   */
  auto: boolean;

  /**
   * The amount of spacing between each cell in the grid. Can be specified with breakpoint-specific values.
   * @default 0
   */
  spacing: Spacing | WithBreakpoint<Spacing>;

  /**
   * The amount of horizontal spacing between each column in the grid. Can be specified with breakpoint-specific values.
   */
  columnSpacing: Spacing | WithBreakpoint<Spacing>;

  /**
   * The amount of vertical spacing between each row in the grid. Can be specified with breakpoint-specific values.
   */
  rowSpacing: Spacing | WithBreakpoint<Spacing>;

  /**
   * Whether to use the Grid component as a container to wrap its children.
   * @default false
   */
  container: boolean;

  /**
   * The direction in which the grid should lay out its children. Can be specified with breakpoint-specific values.
   * @default row
   */
  direction: GridDirection | WithBreakpoint<GridDirection>;

  /**
   * The wrapping behavior of the grid when there are too many children to fit in one row. Can be specified with breakpoint-specific values.
   * @default wrap
   */
  wrap: GridWrap | WithBreakpoint<GridWrap>;

  /**
   * The type of HTML element to use as the root of the Grid component.
   * @default div
   */
  component: React.ElementType;

  /**
   * The horizontal alignment of the grid's children within their cells. Can be specified with breakpoint-specific values.
   */
  justifyContent:
    | CSS.Property.JustifyContent
    | WithBreakpoint<CSS.Property.JustifyContent>;

  /**
   * The vertical alignment of the grid's children within their cells. Can be specified with breakpoint-specific values.
   */
  alignItems: CSS.Property.AlignItems | WithBreakpoint<CSS.Property.AlignItems>;

  /**
   * The number of columns to offset the grid by, as a range of integers from 1 to 12 or "auto". Can be specified with breakpoint-specific values.
   */
  offset: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13> | 'auto'> | 'auto';
}

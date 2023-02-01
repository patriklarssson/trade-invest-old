import { IntRange, Spacing, WithBreakpoint } from '@trade-invest/theme';

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export interface GridBaseProps {
  children?: React.ReactNode;
  columns?: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>>;
  columnSpacing?: Spacing | WithBreakpoint<Spacing>
  container?: boolean;
  direction?: GridDirection | WithBreakpoint<GridDirection>
  disableEqualOverflow?: boolean;
  rowSpacing?: Spacing | WithBreakpoint<Spacing>
  spacing?: Spacing | WithBreakpoint<Spacing>
  wrap?: GridWrap | WithBreakpoint<GridWrap>;
}

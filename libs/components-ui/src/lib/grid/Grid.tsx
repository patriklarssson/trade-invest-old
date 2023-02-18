import styled from '@emotion/styled';
import {
  handleBreakpoints,
  IntRange,
  Spacing,
  WithBreakpoint,
} from '@trade-invest/theme';
import { HTMLAttributes, useContext } from 'react';
import type * as CSS from 'csstype';
import React from 'react';
import { compose } from '../utilities';
import { withDisplay } from '../higher-order-components';

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const maxGridColumns = 12;

/** Props for a Grid component, which arranges its children in a grid layout.*/
interface IGridProps extends HTMLAttributes<HTMLElement> {
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

const GridRoot = styled.div<{
  ownerState: Partial<IGridProps>;
  isNestedContainer?: boolean;
}>(
  ({
    theme,
    ownerState: {
      container,
      direction,
      wrap,
      spacing,
      columns,
      rowSpacing,
      columnSpacing,
      auto,
      justifyContent,
      alignItems,
      offset,
    },
    isNestedContainer,
  }) => {
    let styles: Partial<CSS.Properties> = {
      minWidth: 0,
      boxSizing: 'border-box',
    };

    if (container) {
      styles = {
        ...styles,
        display: 'flex',
      };
    } else if (auto) {
      styles = {
        ...styles,
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
      };
    } else {
      styles = {
        ...styles,
        flexGrow: 0,
        flexBasis: 'auto',
      };
    }

    const defaultSpacing =
      typeof spacing === 'number' ? theme.spacing(spacing) : 0;

    styles = {
      ...styles,
      ...handleBreakpoints(
        theme,
        {
          columns,
          spacing,
          rowSpacing,
          columnSpacing,
          direction,
          wrap,
          justifyContent,
          alignItems,
          offset,
        },
        ({
          columns,
          spacing,
          rowSpacing,
          columnSpacing,
          direction,
          wrap,
          justifyContent,
          alignItems,
          offset,
        }) => {
          const calculatedPadding = `${
            theme.spacing(rowSpacing ?? spacing) ?? defaultSpacing
          }px ${theme.spacing(columnSpacing ?? spacing) ?? defaultSpacing}px`;
          const rootContainerMargin = `-${
            theme.spacing(rowSpacing ?? spacing) ?? defaultSpacing
          }px -${theme.spacing(columnSpacing ?? spacing) ?? defaultSpacing}px`;
          const nestedContainerWidth = `calc(100% * ${columns} / ${maxGridColumns} + ${
            (theme.spacing(columnSpacing ?? spacing) ??
              Number(defaultSpacing)) * 2
          }px)`;

          return {
            justifyContent,
            alignItems,
            // Root Container
            ...(container && {
              flexDirection: direction,
              flexWrap: wrap,
              margin: rootContainerMargin,
            }),

            // Nested container
            ...(isNestedContainer && {
              width: nestedContainerWidth,
              padding: calculatedPadding,
            }),

            // Manuall columns (not auto)
            ...(!auto && {
              ...(!container && {
                padding: calculatedPadding,
              }),
              ...(columns &&
                !container && {
                  width: `${(100 * columns) / maxGridColumns}%`,
                }),
            }),

            // auto
            ...(auto && {
              padding: calculatedPadding,
            }),

            // offset
            ...(offset && {
              ...(offset === 'auto' && {
                marginLeft: 'auto',
              }),
              ...(offset !== 'auto' && {
                marginLeft: `calc(100% * ${offset} / ${maxGridColumns})`,
              }),
            }),
          };
        }
      ),
    };
    return styles;
  }
);

const GridContext = React.createContext<{
  spacing?: Spacing | WithBreakpoint<Spacing>;
  columnSpacing?: Spacing | WithBreakpoint<Spacing>;
  rowSpacing?: Spacing | WithBreakpoint<Spacing>;
  hasContainer: boolean;
}>({ hasContainer: false });

export function Grid(props: Partial<IGridProps>) {
  const spacingContext = useContext(GridContext);

  const {
    children,
    auto = false,
    wrap = 'wrap',
    component = 'div',
    direction = 'row',
    container = false,
    columns = maxGridColumns,
    spacing = spacingContext.spacing ?? 0,
    rowSpacing = spacingContext.rowSpacing ?? 0,
    columnSpacing = spacingContext.columnSpacing ?? 0,
    ...other
  } = props;

  const ownerState = {
    ...props,
    wrap,
    auto,
    columns,
    spacing,
    direction,
    container,
    rowSpacing,
    columnSpacing,
  };

  return (
    <GridRoot
      isNestedContainer={container && spacingContext.hasContainer}
      as={component}
      ownerState={ownerState}
      {...other}
    >
      {container ? (
        <GridContext.Provider
          value={{ hasContainer: true, spacing, columnSpacing, rowSpacing }}
        >
          {children}
        </GridContext.Provider>
      ) : (
        children
      )}
    </GridRoot>
  );
}

export default compose(withDisplay)(Grid);

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

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface IGridProps extends HTMLAttributes<HTMLElement> {
  // interface IGridProps {
  children?: React.ReactNode;
  columns?: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>>;
  auto?: boolean;
  spacing?: Spacing | WithBreakpoint<Spacing>;
  columnSpacing?: Spacing | WithBreakpoint<Spacing>;
  rowSpacing?: Spacing | WithBreakpoint<Spacing>;
  container?: boolean;
  direction?: GridDirection | WithBreakpoint<GridDirection>;
  disableEqualOverflow?: boolean;
  wrap?: GridWrap | WithBreakpoint<GridWrap>;
  component?: React.ElementType;
}

const GridRoot = styled.div<{ ownerState: IGridProps }>(
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
    },
  }) => {
    if (container) {
      return {
        flexDirection: direction,
        minWidth: 0,
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: wrap,
        ...handleBreakpoints(theme, { spacing }, ({ spacing }) => ({
          margin: `calc(${theme.spacing(spacing)}px / 2)`,
        })),
      };
    }

    if (auto) {
      return {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
        ...handleBreakpoints(
          theme,
          { spacing, rowSpacing, columnSpacing },
          ({ spacing, rowSpacing, columnSpacing }) => ({
            padding: `${theme.spacing(rowSpacing ?? spacing)}px ${theme.spacing(
              columnSpacing ?? spacing
            )}px`,
          })
        ),
      };
    }

    return {
      flexGrow: 0,
      flexBasis: 'auto',
      minWidth: 0,
      boxSizing: 'border-box',
      ...handleBreakpoints(
        theme,
        { spacing, columns, rowSpacing, columnSpacing },
        ({ spacing, columns, rowSpacing, columnSpacing }) => ({
          padding: `${theme.spacing(rowSpacing ?? spacing)}px ${theme.spacing(
            columnSpacing ?? spacing
          )}px`,
          ...(columns && {
            width: `${(100 * columns) / 12}%`,
          }),
        })
      ),
    };

    return {};
  }
);


const GridContext = React.createContext<{
  spacing?: Spacing | WithBreakpoint<Spacing>;
  columnSpacing?: Spacing | WithBreakpoint<Spacing>;
  rowSpacing?: Spacing | WithBreakpoint<Spacing>;
}>({});

export function Grid(props: IGridProps) {
  const spacingContext = useContext(GridContext);

  const {
    children,
    component = 'div',
    direction = 'row',
    auto = false,
    columns = 12,
    spacing = spacingContext.spacing ?? 0,
    rowSpacing = spacingContext.rowSpacing ?? 0,
    columnSpacing = spacingContext.columnSpacing ?? 0,
    wrap = 'wrap',
    container = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    container,
    direction,
    columns,
    spacing,
    rowSpacing,
    columnSpacing,
    auto,
    wrap,
  };

  return (
    <GridRoot as={component} ownerState={ownerState} {...other}>
      {container ? (
        <GridContext.Provider value={{ spacing, columnSpacing, rowSpacing }}>
          {children}
        </GridContext.Provider>
      ) : (
        children
      )}
    </GridRoot>
  );
}

export default Grid;

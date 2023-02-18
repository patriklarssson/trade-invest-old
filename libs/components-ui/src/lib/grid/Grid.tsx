import styled from '@emotion/styled';
import {
  handleBreakpoints,
  IntRange,
  Spacing,
  WithBreakpoint,
} from '@trade-invest/theme';
import { useContext } from 'react';
import type * as CSS from 'csstype';
import React from 'react';
import { compose } from '../utilities';
import { withDisplay } from '../higher-order-components';

type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const maxGridColumns = 12

interface IGridProps {
  children: React.ReactNode;
  columns: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>>;
  auto: boolean;
  spacing: Spacing | WithBreakpoint<Spacing>;
  columnSpacing: Spacing | WithBreakpoint<Spacing>;
  rowSpacing: Spacing | WithBreakpoint<Spacing>;
  container: boolean;
  direction: GridDirection | WithBreakpoint<GridDirection>;
  disableEqualOverflow: boolean;
  wrap: GridWrap | WithBreakpoint<GridWrap>;
  component: React.ElementType;
  justifyContent:
    | CSS.Property.JustifyContent
    | WithBreakpoint<CSS.Property.JustifyContent>;
  alignItems: CSS.Property.AlignItems | WithBreakpoint<CSS.Property.AlignItems>;
  offset: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>> | 'auto';
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
    isNestedContainer: isNestedContainer,
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
        }) => ({
          justifyContent,
          alignItems,
          ...(container && {
            flexDirection: direction,
            flexWrap: wrap,
            margin: `-${theme.spacing(
              rowSpacing ?? spacing
            )}px -${theme.spacing(columnSpacing ?? spacing)}px`,
          }),
          ...(auto && {
              padding: `${theme.spacing(
                rowSpacing ?? spacing
              )}px ${theme.spacing(columnSpacing ?? spacing)}px`,
            }),
          ...(!auto && {
            ...((!container || isNestedContainer) && {
              padding: `${theme.spacing(
                rowSpacing ?? spacing
              )}px ${theme.spacing(columnSpacing ?? spacing)}px`,
            }),
              ...(columns && !container && {
                width: `${(100 * columns) / maxGridColumns}%`,
              }),
            }),
          ...(offset && {
              ...(offset === 'auto' && {
                marginLeft: 'auto',
              }),
              ...(offset !== 'auto' && {
                marginLeft: `calc(100% * ${offset} / ${maxGridColumns})`,
              }),
            }),
          // //Nested container
          ...(isNestedContainer && {
            width: `calc(100% * ${columns} / ${maxGridColumns} + ${theme.spacing(columnSpacing ?? spacing) * 2}px)`
          })
        })
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
    component = 'div',
    direction = 'row',
    auto = false,
    columns = maxGridColumns,
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

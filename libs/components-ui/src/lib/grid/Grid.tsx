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

interface IGridProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  columns: IntRange<1, 13> | WithBreakpoint<IntRange<1, 13>>;
  auto: boolean;
  spacing: Spacing | WithBreakpoint<Spacing>;
  columnSpacing: Spacing | WithBreakpoint<Spacing>;
  rowSpacing: Spacing | WithBreakpoint<Spacing>;
  container: boolean;
  direction: GridDirection | WithBreakpoint<GridDirection>;
  wrap: GridWrap | WithBreakpoint<GridWrap>;
  component: React.ElementType;
  justifyContent:
    | CSS.Property.JustifyContent
    | WithBreakpoint<CSS.Property.JustifyContent>;
  alignItems: CSS.Property.AlignItems | WithBreakpoint<CSS.Property.AlignItems>;
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

    const defaultSpacing = theme.spacing(spacing ?? 0);

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

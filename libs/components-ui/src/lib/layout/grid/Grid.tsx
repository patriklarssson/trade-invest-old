import styled from '@emotion/styled';
import {
  handleBreakpoints,
  Spacing,
  WithBreakpoint,
} from '@trade-invest/theme';
import { useContext } from 'react';
import type * as CSS from 'csstype';
import React from 'react';
import { compose } from '../../utilities';
import { withDisplay } from '../../higher-order-components';
import { IGridProps } from './GridProps';

const maxGridColumns = 12;

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
      typeof spacing === 'number' ? theme.spacing(spacing) ?? 0 : 0;

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
          // const calculatedPadding = `${
          //   theme.spacing(rowSpacing ?? spacing) ?? defaultSpacing
          // }px ${theme.spacing(columnSpacing ?? spacing) ?? defaultSpacing}px`;

          // const rootContainerMargin = `-${
          //   theme.spacing(rowSpacing ?? spacing) ?? defaultSpacing
          // }px -${theme.spacing(columnSpacing ?? spacing) ?? defaultSpacing}px`;

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
              ...(spacing && {
                margin: `-${theme.spacing(spacing)}px`,
              }),
              ...(rowSpacing && {
                marginTop: `-${theme.spacing(rowSpacing)}px`,
                marginBottom: `-${theme.spacing(rowSpacing)}px`,
              }),
              ...(columnSpacing && {
                marginRight: `-${theme.spacing(columnSpacing)}px`,
                marginLeft: `-${theme.spacing(columnSpacing)}px`,
              }),
            }),

            // Nested container
            ...(isNestedContainer && {
              width: nestedContainerWidth,
            }),

            // Handle spacing
            ...((!container || isNestedContainer) && {
              ...(spacing && {
                padding: `${theme.spacing(spacing)}px`,
              }),
              ...(rowSpacing && {
                paddingTop: `${theme.spacing(rowSpacing)}px`,
                paddingBottom: `${theme.spacing(rowSpacing)}px`,
              }),
              ...(columnSpacing && {
                paddingRight: `${theme.spacing(columnSpacing)}px`,
                paddingLeft: `${theme.spacing(columnSpacing)}px`,
              }),
            }),

            // Manuall columns (not auto)
            ...(!auto && {
              ...(columns &&
                !container && {
                  width: `${(100 * columns) / maxGridColumns}%`,
                }),
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

// export function Grid(props: Partial<IGridProps>) {
function Grid(props: Partial<IGridProps>) {
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
    offset,
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
    offset,
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

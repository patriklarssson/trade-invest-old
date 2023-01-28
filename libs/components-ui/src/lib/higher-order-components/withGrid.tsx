import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IGridProps {
  gridTemplateColumns:
    | CSS.Property.GridTemplateColumns
    | WithBreakpoint<CSS.Property.GridTemplateColumns>;
  gridTemplateRows:
    | CSS.Property.GridTemplateRows
    | WithBreakpoint<CSS.Property.GridTemplateRows>;
  gridTemplateAreas:
    | CSS.Property.GridTemplateAreas
    | WithBreakpoint<CSS.Property.GridTemplateAreas>;
  gridTemplate:
    | CSS.Property.GridTemplate
    | WithBreakpoint<CSS.Property.GridTemplate>;
  gridAutoColumns:
    | CSS.Property.GridAutoColumns
    | WithBreakpoint<CSS.Property.GridAutoColumns>;
  gridAutoRows:
    | CSS.Property.GridAutoRows
    | WithBreakpoint<CSS.Property.GridAutoRows>;
  gridAutoFlow:
    | CSS.Property.GridAutoFlow
    | WithBreakpoint<CSS.Property.GridAutoFlow>;
  grid: CSS.Property.Grid | WithBreakpoint<CSS.Property.Grid>;
  gridRowStart:
    | CSS.Property.GridRowStart
    | WithBreakpoint<CSS.Property.GridRowStart>;
  gridColumnStart:
    | CSS.Property.GridColumnStart
    | WithBreakpoint<CSS.Property.GridColumnStart>;
  gridRowEnd: CSS.Property.GridRowEnd | WithBreakpoint<CSS.Property.GridRowEnd>;
  gridColumnEnd:
    | CSS.Property.GridColumnEnd
    | WithBreakpoint<CSS.Property.GridColumnEnd>;
  gridRow: CSS.Property.GridRow | WithBreakpoint<CSS.Property.GridRow>;
  gridColumn: CSS.Property.GridColumn | WithBreakpoint<CSS.Property.GridColumn>;
  gridArea: CSS.Property.GridArea | WithBreakpoint<CSS.Property.GridArea>;
}

const withGrid = <T,>(WrappedComponent: ComponentType<T>) => {
  const GridHoc = styled(WrappedComponent)<Partial<IGridProps> & T>(
    ({
      theme,
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      gridTemplate,
      gridAutoColumns,
      gridAutoRows,
      gridAutoFlow,
      grid,
      gridRowStart,
      gridColumnStart,
      gridRowEnd,
      gridColumnEnd,
      gridRow,
      gridColumn,
      gridArea,
    }) => ({
      ...handleBreakpoints(
        theme,
        {
          gridTemplateColumns,
          gridTemplateRows,
          gridTemplateAreas,
          gridTemplate,
          gridAutoColumns,
          gridAutoRows,
          gridAutoFlow,
          grid,
          gridRowStart,
          gridColumnStart,
          gridRowEnd,
          gridColumnEnd,
          gridRow,
          gridColumn,
          gridArea,
        },
        (gridStyles) => ({ ...gridStyles })
      ),
    })
  );
  return (props: T & Partial<IGridProps>) => {
    return <GridHoc {...props} />;
  };
};

export default withGrid;

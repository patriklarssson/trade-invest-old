import styled from '@emotion/styled';
import {
  FlexDirection,
  FlexWrap,
  GridColumns,
  handleBreakpoints,
  Spacing,
  WithBreakpoint,
} from '@trade-invest/theme';
import { HTMLAttributes } from 'react';

interface IGridProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  // columnSpacing
  // rowSpacing
  component?: React.ElementType;
  container?: boolean;
  direction?: FlexDirection;
  item?: boolean;
  columns?: GridColumns | WithBreakpoint<GridColumns>;
  spacing?: Spacing | WithBreakpoint<Spacing>;
  wrap?: FlexWrap;
  zeroMinWidth?: boolean;
}
const columnWidth = (columnValue: number) =>
  `${Math.round((columnValue / 12) * 10e7) / 10e5}%`;

const GridRoot = styled.div<{ ownerState: IGridProps }>(
  ({ theme, ownerState }) => ({
    boxSizing: 'border-box',

    // ...handleBreakpoints(
    //   {
    //     tst: 5,
    //     xs: { one: 'red', two: 'blue' },
    //     test: { yeet: '' },
    //     xl: { one: 'yellow' },
    //   },
    //   (propValue) => ({
    //     backgroundColor: propValue.one,
    //     color: propValue.two,
    //   })
    // ),

    ...(ownerState.container && {
      display: 'flex',
      flexWrap: ownerState.wrap,
      flexDirection: ownerState.direction,
      ...(ownerState.spacing && {
        ...handleBreakpoints(ownerState.spacing, (propValue) => ({
          marginLeft: `-${theme.spacing(propValue)}px`,
          marginTop: `-${theme.spacing(propValue)}px`,
          width: `calc(100% + ${theme.spacing(propValue)}px)`,
        })),
        '>*': {
          ...handleBreakpoints(ownerState.spacing, (propValue) => ({
            paddingLeft: theme.spacing(propValue),
            paddingTop: theme.spacing(propValue),
          })),
          margin: 0,
          flexDirection: ownerState.direction,
          WebkitBoxFlex: 0,
          flexGrow: 0,
        },
      }),
    }),

    ...(ownerState.item && {
      margin: 0,
    }),
    ...(ownerState.zeroMinWidth && {
      minWidth: 0,
    }),
    ...(ownerState.columns &&
      !ownerState.container && {
        ...handleBreakpoints(ownerState.columns, (propValue) => ({
          ...(propValue === 'auto' && {
            flexBasis: 'auto',
            flexGrow: '1',
            flexShrink: '0',
            maxWidth: 'none',
            width: 'auto',
          }),
          ...(propValue !== 'auto' && {
            flexBasis: columnWidth(Number(propValue)),
            maxWidth: columnWidth(Number(propValue)),
          }),
        })),
      }),
  })
);

export function Grid(props: IGridProps) {
  const {
    children,
    component = 'div',
    container = false,
    direction = 'row',
    item = false,
    columns = { xs: 12 },
    spacing = 0,
    wrap = 'wrap',
    zeroMinWidth = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    container,
    direction,
    item,
    wrap,
    zeroMinWidth,
    spacing,
    columns,
  };

  const brekpoint = handleBreakpoints(5, (propValue) => ({
    fontSize: `${propValue}px`,
  }));

  console.log(brekpoint);

  return (
    <GridRoot ownerState={ownerState} as={component} {...other}>
      {children}
    </GridRoot>
  );
}

export default Grid;

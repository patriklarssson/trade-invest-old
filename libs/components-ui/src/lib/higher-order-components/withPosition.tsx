import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints, ZIndex } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';

interface IPositionProps {
  position: CSS.Property.Position;
  zIndex: ZIndex | WithBreakpoint<ZIndex>;
  top: CSS.Property.Top | WithBreakpoint<CSS.Property.Top>;
  right: CSS.Property.Right | WithBreakpoint<CSS.Property.Right>;
  bottom: CSS.Property.Bottom | WithBreakpoint<CSS.Property.Bottom>;
  left: CSS.Property.Left | WithBreakpoint<CSS.Property.Left>;
}

const withPosition = <T,>(WrappedComponent: ComponentType<T>) => {
  const PositionHoc = styled(WrappedComponent)<Partial<IPositionProps> & T>(
    ({ theme, position, zIndex, top, right, bottom, left }) => ({
      ...handleBreakpoints(
        theme,
        {
          position,
          zIndex,
          top,
          right,
          bottom,
          left,
        },
        ({ zIndex, ...positionStyles}) => ({
            ...positionStyles,
            zIndex: theme.zIndex(zIndex)
        })
      ),
    })
  );
  return (props: T & Partial<IPositionProps>) => {
    return <PositionHoc {...props} />;
  };
};

export default withPosition;

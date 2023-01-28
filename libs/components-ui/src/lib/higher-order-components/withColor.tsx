import styled from '@emotion/styled';
import { WithBreakpoint, handleBreakpoints, ZIndex, ThemeColors } from '@trade-invest/theme';
import { ComponentType } from 'react';
import type * as CSS from 'csstype';


interface IColorProps {
  bgColor: ThemeColors
}

const withColor = <T,>(WrappedComponent: ComponentType<T>) => {
  const ColorHoc = styled(WrappedComponent)<Partial<IColorProps> & T>(
    ({ theme, bgColor}) => ({
      ...handleBreakpoints(
        theme,
        {
          bgColor
        },
        ({ bgColor }) => {
            if(bgColor && bgColor[0] && bgColor[1])
            return {
                backgroundColor: theme.palette[bgColor[0]][bgColor[1]],
            }
            return {}
        }
      ),
    })
  );
  return (props: T & Partial<IColorProps>) => {
    return <ColorHoc {...props} />;
  };
};

export default withColor;







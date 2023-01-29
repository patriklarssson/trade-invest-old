import styled from '@emotion/styled';
import { handleBreakpoints, IPalette } from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IColorProps {
  bgColor: (palette: IPalette) => string
  color: (palette: IPalette) => string
}

const withColor = <T,>(WrappedComponent: ComponentType<T>) => {
  const ColorHoc = styled(WrappedComponent)<Partial<IColorProps> & T>(
    ({ theme, bgColor, color}) => ({
      ...handleBreakpoints(
        theme,
        {
          bgColor,
          color
        },
        ({ bgColor, color }) => ({
          ...(bgColor && {
            backgroundColor: bgColor(theme.palette)
          }),
          ...(color && {
            color: color(theme.palette)
          })
        })
      ),
    })
  );
  return (props: T & Partial<IColorProps>) => {
    return <ColorHoc {...props} />;
  };
};

export default withColor;







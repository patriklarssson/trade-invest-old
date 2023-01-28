import styled from '@emotion/styled';
import {
  WithBreakpoint,
  handleBreakpoints,
  Spacing,
} from '@trade-invest/theme';
import { ComponentType } from 'react';

interface IGapProps {
  rowGap: Spacing | WithBreakpoint<Spacing>;
  columnGap: Spacing | WithBreakpoint<Spacing>;
  gap: Spacing | WithBreakpoint<Spacing>;
}

const withGap = <T,>(WrappedComponent: ComponentType<T>) => {
  const GapHoc = styled(WrappedComponent)<Partial<IGapProps> & T>(
    ({ theme, rowGap, columnGap, gap }) => ({
      ...handleBreakpoints(
        theme,
        {
          rowGap,
          columnGap,
          gap,
        },
        ({ rowGap, columnGap, gap }) => ({
          rowGap: `${theme.spacing(rowGap)}px`,
          columnGap: `${theme.spacing(columnGap)}px`,
          gap: `${theme.spacing(gap)}px`,
        })
      ),
    })
  );
  return (props: T & Partial<IGapProps>) => {
    return <GapHoc {...props} />;
  };
};

export default withGap;

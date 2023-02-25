import styled from '@emotion/styled';
import { BreakpointKey, values } from '@trade-invest/theme';
import { HTMLAttributes } from 'react';

interface IContainerProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  component?: React.ElementType;
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: BreakpointKey | false;
}

const ContainerRoot = styled.div<{ ownerState: IContainerProps }>(
  ({ theme, ownerState }) => ({
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',

    ...(ownerState.maxWidth && {
      maxWidth: values[ownerState.maxWidth],
    }),
    ...(!ownerState.disableGutters && {
      [theme.breakpoint.up('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    }),
  })
);

function Container(props: IContainerProps) {
  const {
    component = 'div',
    disableGutters = false,
    fixed = false,
    maxWidth,
    ...other
  } = props;

  const ownerState = {
    disableGutters,
    fixed,
    maxWidth,
  };

  return <ContainerRoot as={component} ownerState={ownerState} {...other} />;
}

export default Container;

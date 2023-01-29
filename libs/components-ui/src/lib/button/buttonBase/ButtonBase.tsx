import styled from '@emotion/styled';

interface IButtonBaseProps {
  children?: React.ReactNode;
  component?: React.ElementType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const ButtonBaseRoot = styled.button<{ ownerState: IButtonBaseProps }>(
  ({ theme, ownerState }) => ({

    boxShadow: theme.shadows(10),

    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    textDecoration: 'none',
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none',
    },
    ...(ownerState.disabled && {
      pointerEvents: 'none',
      cursor: 'default',
    }),
  })
);

export function ButtonBase(props: IButtonBaseProps) {
  const {
    children,
    component = 'button',
    disabled = false,
    onClick,
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    component,
  };

  return (
    <ButtonBaseRoot
      as={component}
      onClick={onClick}
      ownerState={ownerState}
      {...other}
    >
      {children}
    </ButtonBaseRoot>
  );
}

export default ButtonBase;

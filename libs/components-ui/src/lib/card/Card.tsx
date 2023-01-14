import styled from '@emotion/styled';
import { Shadow } from '@trade-invest/theme';
import { HTMLAttributes } from 'react';
import Paper from '../paper/Paper';

interface ICardProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  raised?: boolean;
}

const CardRoot = styled(Paper)(() => ({
  overflow: 'hidden',
}));

export function Card(props: ICardProps) {
  const { raised = false, ...other } = props;

  return <CardRoot elevation={raised ? 8 : undefined} {...other} />;
}

export default Card;

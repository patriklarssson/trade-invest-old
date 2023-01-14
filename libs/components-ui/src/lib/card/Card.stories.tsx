import { ComponentMeta } from '@storybook/react';
import { Card } from './Card';

export default {
  component: Card,
  title: 'Card',
} as ComponentMeta<typeof Card>;

export const BasicPaper = () => {
  return (
    <Card style={{minWidth: 300}}>
        <h3>Cool card</h3>
        <span>Yes indeed</span>
    </Card>
  );
};

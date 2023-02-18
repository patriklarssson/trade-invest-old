import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Paper from '../paper/Paper';
import Grid from './Grid';

export default {
  component: Grid,
  title: 'Grid',
} as ComponentMeta<typeof Grid>;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: 'black',
}));

const Template: ComponentStory<typeof Grid> = (args) => {
  return (
    <Grid {...args} container>
      <Grid columns={8}>
        <Item>Column=8</Item>
      </Grid>
      <Grid columns={4}>
        <Item>Column=4</Item>
      </Grid>
      <Grid columns={4}>
        <Item>Column=4</Item>
      </Grid>
      <Grid columns={8}>
        <Item>Column=8</Item>
      </Grid>
    </Grid>
  );
};

export const Component = Template.bind({});
Component.args = {
  spacing: 2,
};

export const GridLayout = () => {
  return <div></div>;
};

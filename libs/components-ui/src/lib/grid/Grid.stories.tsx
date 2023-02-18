import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Paper from '../paper/Paper';
import Grid from './Grid';
// https://storybook.js.org/docs/react/essentials/controls
export default {
  component: Grid,
  title: 'Grid',
  parameters: {
    controls: {
      exclude: ['container'],
    },
  },
} as ComponentMeta<typeof Grid>;

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: 'black',
}));

Grid.displayName = 'Grid';

const Template: ComponentStory<typeof Grid> = (args) => {
  return (
    <Grid {...args}>
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

export const BasicGrid = Template.bind({});
BasicGrid.args = {
  container: true,
  spacing: 2,
};

BasicGrid.parameters = {
  controls: {
    exclude: ['spacing'],
  },
};

export const Spacing = Template.bind({});
Spacing.args = {
  container: true,
  spacing: 2,
  rowSpacing: 0,
  columnSpacing: 0,
};
Spacing.argTypes = {
  spacing: {
    control: { type: 'range', min: 0, max: 6, step: 1 },
  },
  rowSpacing: {
    control: { type: 'range', min: 0, max: 6, step: 1 },
  },
  columnSpacing: {
    control: { type: 'range', min: 0, max: 6, step: 1 },
  },
};

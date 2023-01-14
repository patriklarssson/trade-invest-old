import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Stack from '../stack/Stack';
import { Paper } from './Paper';

export default {
  component: Paper,
  title: 'Paper',
  parameters: {
    componentSubtitle:
      'The paper is a basic building block',
  },
} as ComponentMeta<typeof Paper>;

const Container = styled(Stack)(() => ({
  div: {
    height: 200,
    width: 200,
  },
}));

const Template: ComponentStory<typeof Paper> = (args) => {
  return (
    <Container>
      <Paper {...args} />
    </Container>
  );
};

export const Component = Template.bind({});

Component.args = {
  elevation: 1,
  square: false,
  variant: 'elevation',
};

Component.argTypes = {
  elevation: {
    control: { type: 'range', min: 0, max: 24 },
  },
};

Component.parameters = {
  controls: {
    exclude: ['component', 'children'],
  },
  docs: {
    storyDescription: 'Explore the divider variants',
  },
};

export const BasicPaper = () => {
  return (
    <Container direction={'row'} spacing={4}>
      <Paper elevation={0} />
      <Paper />
      <Paper elevation={3} />
    </Container>
  );
};

export const Variants = () => {
  return (
    <Container direction={'row'} spacing={4}>
      <Paper variant="outlined" />
      <Paper variant="outlined" square />
    </Container>
  );
};

export const Elevation = () => {
  return (
    <Container direction={'row'} spacing={4}>
      <Paper elevation={0} />
      <Paper elevation={1} />
      <Paper elevation={2} />
      <Paper elevation={3} />
      <Paper elevation={4} />
      <Paper elevation={6} />
      <Paper elevation={8} />
      <Paper elevation={12} />
      <Paper elevation={16} />
      <Paper elevation={24} />
    </Container>
  );
};

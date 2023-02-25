import styled from '@emotion/styled';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Typography from '../../typography/Typography';
import { Stack } from './Stack';
import { Divider } from '../../dataDisplay/divider/Divider';

export default {
  component: Stack,
  title: 'Stack',
} as ComponentMeta<typeof Stack>;

const Template: ComponentStory<typeof Stack> = (args) => {
  return <Stack {...args} />;
};

export const Component = Template.bind({});
Component.args = {
  divider: <Divider/>,
  children: [
    <div>Hello</div>,
    <div>Hello</div>,
    <div>Hello</div>,
    <div>Hello</div>,
  ],
  spacing: 2,
};

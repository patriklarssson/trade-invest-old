import { ComponentMeta, ComponentStory } from "@storybook/react";
import Divider from "../../dataDisplay/divider/Divider";
import Stack from "./Stack";


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

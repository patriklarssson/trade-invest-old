import { ComponentStory, ComponentMeta } from '@storybook/react';
import Typography from '../typography/Typography';
import { Divider } from './Divider';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

export const ListDivider = () => {
  return (
    <div
      style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 5 }}
    >
      <Typography variant="subtitle1">List</Typography>
      <Divider />
      <Typography variant="subtitle1">Items</Typography>
      <Divider />
      <Typography variant="subtitle1">With</Typography>
      <Divider />
      <Typography variant="subtitle1">Dividers</Typography>
    </div>
  );
};

const lorem = (
  <div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt tempora
    aut nihil veniam fugiat perferendis voluptatem magni vitae, cupiditate
    quidem
  </div>
);

export const DividerWithContent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      {lorem}
      <Divider />
      {lorem}
      <Divider textAlign="center">CENTER</Divider>
      {lorem}
      <Divider textAlign="left">LEFT</Divider>
      {lorem}
      <Divider textAlign="right">RIGHT</Divider>
      {lorem}
      <Divider textAlign="center">
        <span
          style={{
            backgroundColor: 'lightgray',
            borderRadius: '20%',
            padding: 10,
          }}
        >
          Chip
        </span>
      </Divider>
      {lorem}
    </div>
  );
};

export const VerticalDivider = () => {
  return (
    <div
      style={{ maxWidth: 600, display: 'flex', flexDirection: 'row', gap: 30 }}
    >
      {lorem}
      <Divider flexItem orientation="vertical">
        Divider
      </Divider>
      {lorem}
    </div>
  );
};

const Template: ComponentStory<typeof Divider> = (args) => {
  const direction = args.orientation === 'horizontal' ? 'column' : 'row';
  return (
    <div
      style={{
        maxWidth: 600,
        display: 'flex',
        flexDirection: direction,
        gap: 30,
      }}
    >
      {lorem}
      <Divider {...args}>Divider</Divider>
      {lorem}
    </div>
  );
};

export const Component = Template.bind({});

Component.args = {};

Component.parameters = {
    controls: {
      exclude: ["component", "children"]
    },
    docs: {
      storyDescription:
        'Explore the divider variants',
    },
  };
import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { WithBreakpoint } from '@trade-invest/theme';
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
      <Grid columns={5}>
        <Item>Column=5</Item>
      </Grid>
      <Grid columns={7}>
        <Item>Column=7</Item>
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
    exclude: ['container', 'spacing'],
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

export const Direction = Template.bind({});
Direction.args = {
  container: true,
  spacing: 2,
  direction: 'column',
};

Direction.argTypes = {
  direction: {
    options: ['column', 'row', 'column-reverse', 'row-reverse'],
    control: { type: 'select' },
  },
};

Direction.parameters = {
  controls: {
    exclude: ['container', 'spacing'],
  },
};

export const Wrap = Template.bind({});
Wrap.args = {
  container: true,
  spacing: 2,
  wrap: 'wrap',
};
Wrap.argTypes = {
  wrap: {
    options: ['wrap', 'wrap-reverse', 'nowrap'],
    control: { type: 'select' },
  },
};

Wrap.parameters = {
  controls: {
    exclude: ['container', 'spacing'],
  },
};

export const AutoLayout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid columns={3}>
          <Item>Column=3</Item>
        </Grid>
        <Grid auto>
          <Item>Auto</Item>
        </Grid>
        <Grid columns={5}>
          <Item>Column=5</Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid auto>
          <Item>Auto</Item>
        </Grid>
        <Grid columns={3}>
          <Item>Columns=3</Item>
        </Grid>
        <Grid columns={1}>
          <Item>Column=1</Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid columns={2}>
          <Item>Columns=2</Item>
        </Grid>
        <Grid columns={8}>
          <Item>Column=8</Item>
        </Grid>
        <Grid auto>
          <Item>Auto</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export const NestedGrid = () => {
  return (
    <Grid container spacing={2}>
      <Grid columns={6}>
        <Item>Column=6</Item>
      </Grid>
      <Grid columns={6}>
        <Item>Column=6</Item>
      </Grid>
      <Grid container columns={6}>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
        <Grid container columns={6}>
          <Grid columns={6}>
            <Item>Column=6</Item>
          </Grid>
          <Grid columns={6}>
            <Item>Column=6</Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Offset = () => {
  return (
    <Grid container spacing={2}>
      <Grid columns={2}>
        <Item>1</Item>
      </Grid>
      <Grid columns={2} offset="auto">
        <Item>2</Item>
      </Grid>
      <Grid columns={2}>
        <Item>3</Item>
      </Grid>
      <Grid columns={6} offset={2}>
        <Item>4</Item>
      </Grid>
    </Grid>
  );
};

export const AlignItems = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        columns={6}
        display="flex"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Item>Item</Item>
        <Item>Item</Item>
        <Item>Item</Item>
      </Grid>
      <Grid
        columns={6}
        display="flex"
        justifyContent={'space-between'}
        alignItems={'end'}
      >
        <Item>Item</Item>
        <Item>Item</Item>
        <Item>Item</Item>
      </Grid>
    </Grid>
  );
};

const AlterChildTemplate: ComponentStory<any> = ({
  columns,
  spacing,
  direction,
  justifyContent,
  alignItems,
  offset,
  wrap,
}) => {
  return (
    <div>
      <p>Columns</p>
      <Grid container spacing={3}>
        <Grid columns={columns}>
          <Item>Column={JSON.stringify(columns)}</Item>
        </Grid>
        <Grid columns={columns}>
          <Item>Column={JSON.stringify(columns)}</Item>
        </Grid>
      </Grid>
      <p>Spacing</p>
      <Grid container spacing={spacing}>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
      </Grid>
      <p>Direction</p>
      <Grid container spacing={3} direction={direction}>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
        <Grid columns={6}>
          <Item>Column=6</Item>
        </Grid>
      </Grid>
      <p>Wrap</p>
      <Grid container spacing={3} wrap={wrap}>
        <Grid columns={8}>
          <Item>Column=8</Item>
        </Grid>
        <Grid columns={4}>
          <Item>Column=4</Item>
        </Grid>
        <Grid columns={7}>
          <Item>Column=7</Item>
        </Grid>
        <Grid columns={5}>
          <Item>Column=5</Item>
        </Grid>
      </Grid>
      <p>Align Items</p>
      <Grid container spacing={3}>
        <Grid
          columns={6}
          display="flex"
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          <Item>Column=6</Item>
          <Item>Column=6</Item>
          <Item>Column=6</Item>
        </Grid>
        <Grid
          columns={6}
          display="flex"
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          <Item>Column=6</Item>
          <Item>Column=6</Item>
          <Item>Column=6</Item>
        </Grid>
      </Grid>
      <p>Offset Items</p>
      <Grid container spacing={3}>
        <Grid columns={2} offset={offset}>
          <Item>Column=2</Item>
        </Grid>
        <Grid columns={2}>
          <Item>Column=2</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export const MultipleBreakpoints = AlterChildTemplate.bind({});

MultipleBreakpoints.args = {
  columns: { xs: 12, sm: 10, md: 8, lg: 6, xl: 4 },
  spacing: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
  direction: { xs: 'row', lg: 'column' },
  justifyContent: {
    xs: 'left',
    sm: 'right',
    md: 'center',
    lg: 'space-between',
    xl: 'space-around',
  },
  alignItems: { xs: 'end', sm: 'start', md: 'center', lg: 'start', xl: 'end' },
  offset: { xs: 2, sm: 3, md: 'auto', lg: 5, xl: 6 },
  wrap: { xs: 'nowrap', sm: 'wrap', md: 'nowrap', lg: 'wrap', xl: 'nowrap' },
};

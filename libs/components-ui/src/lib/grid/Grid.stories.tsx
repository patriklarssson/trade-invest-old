import { ComponentMeta } from '@storybook/react';
import { Grid } from './Grid';

export default {
  component: Grid,
  title: 'Grid',
} as ComponentMeta<typeof Grid>;

export const GridLayout = () => {
  return (
    <div>
      <Grid container columnSpacing={6} spacing={2}>
        <Grid columns={8}>
          <div style={{ backgroundColor: 'red' }}>8</div>
        </Grid>
        <Grid columns={12}>
          <div style={{ backgroundColor: 'red' }}>12</div>
        </Grid>
        <Grid columns={8}>
          <div style={{ backgroundColor: 'red' }}>8</div>
        </Grid>
        <Grid columns={4}>
          <div style={{ backgroundColor: 'red' }}>4</div>
        </Grid>
        <Grid columns={3}>
          <div style={{ backgroundColor: 'red' }}>3</div>
        </Grid>
        <Grid columns={3}>
          <div style={{ backgroundColor: 'red' }}>3</div>
        </Grid>
        <Grid columns={3}>
          <div style={{ backgroundColor: 'red' }}>3</div>
        </Grid>
        <Grid columns={3}>
          <div style={{ backgroundColor: 'red' }}>3</div>
        </Grid>
      </Grid>
      <h1>new</h1>
      <Grid container spacing={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}}>
        <Grid auto>
          <div style={{ backgroundColor: 'red' }}>auto</div>
        </Grid>
        <Grid columns={{xs: 1, sm: 2, md: 3, lg: 4, xl: 5}}>
          <div style={{ backgroundColor: 'red' }}>6</div>
        </Grid>
        <Grid auto>
          <div style={{ backgroundColor: 'red' }}>auto</div>
        </Grid>
      </Grid>
    </div>
  );
};

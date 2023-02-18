import { ComponentMeta } from '@storybook/react';
import Grid from './Grid';

export default {
  component: Grid,
  title: 'Grid',
} as ComponentMeta<typeof Grid>;

export const GridLayout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid columns={6}>
          <div style={{ backgroundColor: 'red' }}>child 1</div>
        </Grid>
        <Grid columns={6}>
          <div style={{ backgroundColor: 'red' }}>child 1</div>
        </Grid>
        <Grid container columns={6}>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 2</div>
          </Grid>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 2</div>
          </Grid>
          <Grid container columns={12}>
            <Grid columns={6}>
              <div style={{ backgroundColor: 'red' }}>child 3</div>
            </Grid>
            <Grid columns={6}>
              <div style={{ backgroundColor: 'red' }}>child 3</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container spacing={2}>
        <Grid columns={6}>
          <div style={{ backgroundColor: 'red' }}>child 1</div>
        </Grid>
        <Grid columns={6}>
          <div style={{ backgroundColor: 'red' }}>child 1</div>
        </Grid>
        <Grid container columns={6}>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 2</div>
          </Grid>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 2</div>
          </Grid>
          <Grid container columns={12}>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 3</div>
          </Grid>
          <Grid columns={6}>
            <div style={{ backgroundColor: 'red' }}>child 3</div>
          </Grid>
        </Grid>
        </Grid>
      </Grid> */}

      {/* <Grid container spacing={3}>
        <Grid columns={6} offset={"auto"}>
          <div style={{ backgroundColor: 'red' }}>1</div>
        </Grid>
        <Grid columns={4}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={4}>
          <div style={{ backgroundColor: 'red' }}>3</div>
        </Grid>
        <Grid columns={4}>
          <div style={{ backgroundColor: 'red' }}>4</div>
        </Grid>
      </Grid> */}

      {/* <Grid container columnSpacing={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}} spacing={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}}>
        <Grid columns={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={2}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={2}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={2}>
          <div style={{ backgroundColor: 'red' }}>2</div>
        </Grid>
        <Grid columns={{xs: 5, sm: 5, md: 5, lg: 5, xl: 5}}>
          <div style={{ backgroundColor: 'red' }}>4</div>
        </Grid>
        <Grid columns={4}>
          <div style={{ backgroundColor: 'red' }}>4</div>
        </Grid>
        <Grid columns={8}>
          <div style={{ backgroundColor: 'red' }}>8</div>
        </Grid>
      </Grid>

      <Grid container columnSpacing={2} spacing={2}>
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
      </Grid> */}
    </div>
  );
};

import { matchers } from '@emotion/jest';
import { handleBreakpoints } from './breakpoint';
expect.extend(matchers);

const bp = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const mockTheme: any = {
  breakpoint: {
    up: (value: keyof typeof bp) => `@media (min-width:${bp[value]}px)`,
  },
};

const breakPoint = (key: keyof typeof bp, value: object) => {
  return {
    [mockTheme.breakpoint.up(key)]: {
      ...value,
    },
  };
};

describe('Breakpoint', () => {
  test('should create style without breakpoint', () => {
    const style = handleBreakpoints(mockTheme, 'red', (x) => ({
      backgroundColor: x,
    }));

    expect(style).toEqual({ backgroundColor: 'red' });
  });
  test('should create style with breakpoint', () => {
    const style = handleBreakpoints(
      mockTheme,
      {
        backgroundColor: {
          xs: 'red',
          sm: 'blue',
          md: 'orange',
          lg: 'white',
          xl: 'black',
        },
      },
      ({ backgroundColor }) => ({
        backgroundColor,
      })
    );
    expect(style).toEqual({
      ...breakPoint('xs', { backgroundColor: 'red' }),
      ...breakPoint('sm', { backgroundColor: 'blue' }),
      ...breakPoint('md', { backgroundColor: 'orange' }),
      ...breakPoint('lg', { backgroundColor: 'white' }),
      ...breakPoint('xl', { backgroundColor: 'black' }),
    });
  });
  test('should create style and style with breakpoint', () => {
    const style = handleBreakpoints(
      mockTheme,
      {
        backgroundColor: {
          xs: 'red',
          sm: 'blue',
          md: 'orange',
          lg: 'white',
          xl: 'black',
        },
        color: 'gray',
        fontSize: '12px',
      },
      ({ backgroundColor, color, fontSize }) => ({
        backgroundColor,
        color,
        fontSize,
      })
    );
    expect(style).toEqual({
      color: 'gray',
      fontSize: '12px',
      ...breakPoint('xs', { backgroundColor: 'red' }),
      ...breakPoint('sm', { backgroundColor: 'blue' }),
      ...breakPoint('md', { backgroundColor: 'orange' }),
      ...breakPoint('lg', { backgroundColor: 'white' }),
      ...breakPoint('xl', { backgroundColor: 'black' }),
    });
  });

  test('should remove undefined values', () => {
    const style = handleBreakpoints(
      mockTheme,
      {
        border: {
          xs: 'undefinedpx solid',
          sm: '2px solid',
          md: 'undefinedpx dotted',
          lg: undefined,
          xl: '5px dotted',
        },
        color: undefined,
        fontSize: 'undefinedpx',
        padding: '10px',
        margin: undefined,
      },
      ({ border, color, fontSize, padding, margin }) => ({
        border,
        color,
        fontSize,
        padding,
        margin: `${margin}px`,
      })
    );
    expect(style).toStrictEqual({
      padding: '10px',
      ...breakPoint('sm', { border: '2px solid' }),
      ...breakPoint('xl', { border: '5px dotted' }),
    });
  });
  test('should add many styles with breakpoint', () => {
    const style = handleBreakpoints(
      mockTheme,
      {
        padding: {
          xs: '1px',
          sm: '2px',
          md: '3px',
          lg: '4px',
          xl: '5px',
        },
        margin: {
          xs: '1px',
          sm: '2px',
          md: '3px',
          lg: '4px',
          xl: '5px',
        },
      },
      ({ padding, margin }) => ({
        padding,
        margin,
      })
    );
    expect(style).toStrictEqual({
      ...breakPoint('xs', { padding: '1px', margin: '1px' }),
      ...breakPoint('sm', { padding: '2px', margin: '2px' }),
      ...breakPoint('md', { padding: '3px', margin: '3px' }),
      ...breakPoint('lg', { padding: '4px', margin: '4px' }),
      ...breakPoint('xl', { padding: '5px', margin: '5px' }),
    });
  });
});

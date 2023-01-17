import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import withBorder from './withBorder';
import { ThemeProvider } from '@emotion/react';
expect.extend(matchers);

const mockTheme: any = {
  breakpoint: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
  palette: {
    common: {
      black: 'black',
    },
  },
  border: {
    default: 3,
  },
  shape: {
    borderRadius: 4,
  },
};

const breakpointKeys = Object.keys(mockTheme.breakpoint);

describe('withBorder', () => {
  const TestComponent = styled.div();
  const WrappedComponent = withBorder(TestComponent);

  test('should add default border to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent border />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border', '3px solid');
    expect(tree).toHaveStyleRule('border-color', 'black');
  });
  test('should add border to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent border={10} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border', '10px solid');
  });

  test('should add border color to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent border borderColor="red" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border-color', 'red');
  });
  test('should add border-radius by pixels to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent borderRadius={10} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule(
      'border-radius',
      `${mockTheme.shape.borderRadius * 10}px`
    );
  });
  test('should add border-radius by percentage to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent borderRadius="50%" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border-radius', '50%');
  });
  test('should add border-style to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent border borderStyle="dotted" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border-style', 'dotted');
  });
  test('should add induvidual borders to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent
            borderTop={1}
            borderRight={2}
            borderBottom={3}
            borderLeft={4}
          />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('border-top', '1px solid');
    expect(tree).toHaveStyleRule('border-right', '2px solid');
    expect(tree).toHaveStyleRule('border-bottom', '3px solid');
    expect(tree).toHaveStyleRule('border-left', '4px solid');
  });
  test('should add border by breakpoint to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent
            borderTop={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            borderRight={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            borderBottom={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            borderLeft={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          />
        </ThemeProvider>
      )
      .toJSON();

    breakpointKeys.forEach((bp, index) => {
      expect(tree).toHaveStyleRule('border-top', `${index + 1}px solid`, {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
      expect(tree).toHaveStyleRule('border-right', `${index + 1}px solid`, {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
      expect(tree).toHaveStyleRule('border-bottom', `${index + 1}px solid`, {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
      expect(tree).toHaveStyleRule('border-left', `${index + 1}px solid`, {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
    });
  });
});

import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import withMargin from './withmargin';
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
  spacing: (value: number) => value,
};

const breakpointKeys = Object.keys(mockTheme.breakpoint);

describe('withMargin', () => {
  const TestComponent = styled.div();
  const WrappedComponent = withMargin(TestComponent);

  test('should add margin to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent m={1} mt={1} mr={1} mb={1} ml={1} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('margin', '1px');
    expect(tree).toHaveStyleRule('margin-top', '1px');
    expect(tree).toHaveStyleRule('margin-right', '1px');
    expect(tree).toHaveStyleRule('margin-bottom', '1px');
    expect(tree).toHaveStyleRule('margin-left', '1px');
  });
  test('should add X/Y margin to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent mx={1} my={1} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('margin-top', '1px');
    expect(tree).toHaveStyleRule('margin-right', '1px');
    expect(tree).toHaveStyleRule('margin-bottom', '1px');
    expect(tree).toHaveStyleRule('margin-left', '1px');
  });

  test('should add margin by breakpoints', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent m={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} />
        </ThemeProvider>
      )
      .toJSON();

    breakpointKeys.forEach((bp) => {
      expect(tree).toHaveStyleRule('margin', '1px', {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
    });
  });
  test('should add margin with and without breakpoints', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent mt={{ md: 1 }} mb={1} />
        </ThemeProvider>
      )
      .toJSON();

    expect(tree).toHaveStyleRule('margin-top', '1px', {
      media: `(min-width: ${mockTheme.breakpoint.md}px)`,
    });
    expect(tree).toHaveStyleRule('margin-bottom', '1px');
  });
});

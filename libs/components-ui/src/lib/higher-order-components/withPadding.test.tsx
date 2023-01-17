import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import withPadding from './withPadding';
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

describe('withPadding', () => {
  const TestComponent = styled.div();
  const WrappedComponent = withPadding(TestComponent);

  test('should add padding to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent p={1} pt={1} pr={1} pb={1} pl={1} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('padding', '1px');
    expect(tree).toHaveStyleRule('padding-top', '1px');
    expect(tree).toHaveStyleRule('padding-right', '1px');
    expect(tree).toHaveStyleRule('padding-bottom', '1px');
    expect(tree).toHaveStyleRule('padding-left', '1px');
  });
  test('should add X/Y padding to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent px={1} py={1} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('padding-top', '1px');
    expect(tree).toHaveStyleRule('padding-right', '1px');
    expect(tree).toHaveStyleRule('padding-bottom', '1px');
    expect(tree).toHaveStyleRule('padding-left', '1px');
  });

  test('should add padding by breakpoints', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent p={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} />
        </ThemeProvider>
      )
      .toJSON();

    breakpointKeys.forEach((bp) => {
      expect(tree).toHaveStyleRule('padding', '1px', {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
    });
  });
  test('should add padding with and without breakpoints', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent pt={{ md: 1 }} pb={1} />
        </ThemeProvider>
      )
      .toJSON();

    expect(tree).toHaveStyleRule('padding-top', '1px', {
      media: `(min-width: ${mockTheme.breakpoint.md}px)`,
    });
    expect(tree).toHaveStyleRule('padding-bottom', '1px');
  });
});

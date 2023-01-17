import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import withDisplay from './withDisplay';
import { ThemeProvider } from '@emotion/react';
expect.extend(matchers);

const mockTheme: any = {
  breakpoint: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  }
};

const breakpointKeys = Object.keys(mockTheme.breakpoint);

describe('withDisplay', () => {
  const TestComponent = styled.div();
  const WrappedComponent = withDisplay(TestComponent);

  test('should add display to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent display="flex" />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('display', 'flex');
  });
  test('should add display with breakpoint to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent
            display={{
              xs: 'flex',
              sm: 'inline',
              md: 'grid',
              lg: 'block',
              xl: 'contents',
            }}
          />
        </ThemeProvider>
      )
      .toJSON();
    const display = ['flex', 'inline', 'grid', 'block', 'contents'];
    breakpointKeys.forEach((bp, index) => {
      expect(tree).toHaveStyleRule('display', display[index], {
        media: `(min-width: ${mockTheme.breakpoint[bp]}px)`,
      });
    });
  });
  test('should hide the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent hidden />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('display', 'none');
  });
});

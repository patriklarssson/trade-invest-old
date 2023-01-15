import { ThemeProvider } from '@emotion/react';
import { theme } from '@trade-invest/theme';
import { render, cleanup } from '@testing-library/react';
import { compose } from '../utilities';
import { withPadding } from './';

const TestComponent = (props: any) => <div {...props}>Test</div>;
const WrappedComponent = compose(withPadding)(TestComponent);
const defaultTheme =  theme[0]

afterEach(cleanup);

describe('withPadding', () => {
  it('should add padding to the wrapped component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <WrappedComponent p={2} />
      </ThemeProvider>
    );
    const div = container.firstChild;
    expect(div).toHaveStyleRule('padding', '16px');
    expect(div).tohave('padding', '16px');
  });

  it('should add padding-top to the wrapped component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <WrappedComponent pt={2} />
      </ThemeProvider>
    );
    const div = container.firstChild;
    expect(div).toHaveStyleRule('padding-top', '16px');
  });

  it('should add padding-right to the wrapped component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <WrappedComponent pr={2} />
      </ThemeProvider>
    );
    const div = container.firstChild;
    expect(div).toHaveStyleRule('padding-right', '16px');
  });
});

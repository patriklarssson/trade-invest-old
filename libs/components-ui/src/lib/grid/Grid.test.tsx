import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { theme as themes } from '@trade-invest/theme';
jest.mock('@trade-invest/theme');
expect.extend(matchers);

const theme = themes[0];
describe('withPadding', () => {
  const WrappedComponent = styled.div(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  test('should add padding to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <WrappedComponent>hello</WrappedComponent>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('color', theme.palette.primary.main);
  });
});

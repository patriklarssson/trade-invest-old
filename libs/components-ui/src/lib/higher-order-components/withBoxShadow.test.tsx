import renderer from 'react-test-renderer';
import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import withBoxShadow from './withBoxShadow';
import { ThemeProvider } from '@emotion/react';
expect.extend(matchers);

const shadows = [
    "60px -16px teal",
]
const mockTheme: any = {
    shadows: (num: number) => shadows[num]
};

describe('withBoxShadow', () => {
  const TestComponent = styled.div();
  const WrappedComponent = withBoxShadow(TestComponent);

  test('should add box-shadow to the wrapped component', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={mockTheme}>
          <WrappedComponent boxShadow={0} />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toHaveStyleRule('box-shadow', '60px -16px teal');
  });
});

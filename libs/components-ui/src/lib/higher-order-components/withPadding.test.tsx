// import { ThemeProvider } from '@emotion/react';
// import { theme } from '@trade-invest/theme';
// import { render, cleanup } from '@testing-library/react';
// import { compose } from '../utilities';
// import { withPadding } from './';

// const TestComponent = (props: any) => <div {...props}>Test</div>;
// const WrappedComponent = compose(withPadding)(TestComponent);
// const defaultTheme =  theme[0]

// afterEach(cleanup);

// describe('withPadding', () => {
//   it('should add padding to the wrapped component', () => {
//     const { container } = render(
//       <ThemeProvider theme={defaultTheme}>
//         <WrappedComponent p={2} />
//       </ThemeProvider>
//     );
//     const div = container.firstChild;
//     expect(div).toHaveStyleRule('padding', '16px');
//   });

//   it('should add padding-top to the wrapped component', () => {
//     const { container } = render(
//       <ThemeProvider theme={defaultTheme}>
//         <WrappedComponent pt={2} />
//       </ThemeProvider>
//     );
//     const div = container.firstChild;
//     expect(div).toHaveStyleRule('padding-top', '16px');

//     const style = getComputedStyle(container.firstChild)
//     expect(style.padding).toBe(10)
//   });

//   test('background color should be red', () => {
//     render(<h1 />);

//     const element = screen.getByText('Hello');
//     const styles = getComputedStyle(element);

//     expect(styles.backgroundColor).toBe('red');
// })

//   it('should add padding-right to the wrapped component', () => {
//     const { container } = render(
//       <ThemeProvider theme={defaultTheme}>
//         <WrappedComponent pr={2} />
//       </ThemeProvider>
//     );
//     const div = container.firstChild;
//     expect(div).toHaveStyleRule('padding-right', '16px');
//   });
// });


import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import withPadding from './withPadding';
import { Spacing } from '@trade-invest/theme';

const TestComponent = () => <div>Test Component</div>;
const TestComponentWithPadding = withPadding(TestComponent);

describe('withPadding', () => {
  test('applies padding', () => {
    const { container } = render(
      <TestComponentWithPadding p={Spacing.medium} />
    );
    expect(container.firstChild).toHaveStyle(`padding: 8px`);
  });

  test('applies padding top', () => {
    const { container } = render(
      <TestComponentWithPadding pt={Spacing.medium} />
    );
    expect(container.firstChild).toHaveStyle(`padding-top: 8px`);
  });

  test('applies padding right', () => {
    const { container } = render(
      <TestComponentWithPadding pr={Spacing.medium} />
    );
  }

})
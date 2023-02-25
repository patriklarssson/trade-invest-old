import { matchers } from '@emotion/jest';
import {
  BreakpointKey,
  theme as themes,
  WithBreakpoint,
} from '@trade-invest/theme';
import Grid from './Grid';
import { renderWithTheme, isElement } from '../../test-utilities';
import { IGridProps } from './GridProps';
import { screen } from '@testing-library/react';
jest.mock('@trade-invest/theme');
expect.extend(matchers);

const theme = themes[0];
type TestCaseGrid<T = string> = { props: Partial<IGridProps>; expected: T };

describe('Grid', () => {
  test('should create basic grid with children and apply styling', () => {
    const element = renderWithTheme(
      <Grid container spacing={2}>
        <Grid />
        <Grid />
        <Grid />
        <Grid />
      </Grid>
    );
    expect(element.hasChildNodes()).toBeTruthy();
    expect(element).toHaveStyleRule('min-width', '0');
    expect(element).toHaveStyleRule('box-sizing', 'border-box');
    expect(element).toHaveStyleRule('display', 'flex');
    expect(element).toHaveStyleRule('flex-direction', 'row');
    expect(element).toHaveStyleRule('flex-wrap', 'wrap');
    expect(element).toHaveStyleRule('margin', `-${theme.spacing(2)}px`);

    element.childNodes.forEach((child) => {
      expect(child).toHaveStyleRule('min-width', '0');
      expect(child).toHaveStyleRule('box-sizing', 'border-box');
      expect(child).toHaveStyleRule('flex-grow', '0');
      expect(child).toHaveStyleRule('flex-basis', 'auto');
      expect(child).toHaveStyleRule('width', '100%');
      expect(child).toHaveStyleRule('padding', `${theme.spacing(2)}px`);
    });
  });

  test('should create 12 column grid', () => {
    const element = renderWithTheme(
      <Grid container>
        <Grid columns={8} />
        <Grid columns={4} />
      </Grid>
    );

    const childNodess = Array.from(element.childNodes);
    const totalWidth = childNodess.reduce((acc, curr) => {
      if (isElement(curr)) {
        const width = parseFloat(window.getComputedStyle(curr).width);
        return acc + width;
      }
      return 0;
    }, 0);

    expect(totalWidth).toBe(100);
  });

  test('should create a 6 column grid', () => {
    const element = renderWithTheme(
      <Grid container>
        <Grid columns={2} />
        <Grid columns={4} />
      </Grid>
    );

    const childNodess = Array.from(element.childNodes);
    const totalWidth = childNodess.reduce((acc, curr) => {
      if (isElement(curr)) {
        const width = parseFloat(window.getComputedStyle(curr).width);
        return acc + width;
      }
      return 0;
    }, 0);

    expect(totalWidth).toBe(50);
  });

  test('should add spacing to children', () => {
    const element = renderWithTheme(
      <Grid container spacing={2}>
        <Grid />
        <Grid />
      </Grid>
    );

    element.childNodes.forEach((child) => {
      expect(child).toHaveStyleRule('padding', `${theme.spacing(2)}px`);
    });
  });
  test('should add row spacing to children', () => {
    const element = renderWithTheme(
      <Grid container rowSpacing={2}>
        <Grid />
        <Grid />
      </Grid>
    );
    element.childNodes.forEach((child) => {
      expect(child).toHaveStyleRule('padding-top', `${theme.spacing(2)}px`);
      expect(child).toHaveStyleRule('padding-bottom', `${theme.spacing(2)}px`);
    });
  });

  test('should add column spacing to children', () => {
    const element = renderWithTheme(
      <Grid container columnSpacing={2}>
        <Grid />
        <Grid />
      </Grid>
    );
    element.childNodes.forEach((child) => {
      expect(child).toHaveStyleRule('padding-right', `${theme.spacing(2)}px`);
      expect(child).toHaveStyleRule('padding-left', `${theme.spacing(2)}px`);
    });
  });

  test('should add flex direction to container', () => {
    const testCases: TestCaseGrid[] = [
      {
        props: { container: true, direction: 'column' },
        expected: `column`,
      },
      {
        props: { container: true, direction: 'column-reverse' },
        expected: `column-reverse`,
      },
      {
        props: { container: true, direction: 'row' },
        expected: `row`,
      },
      {
        props: { container: true, direction: 'row-reverse' },
        expected: `row-reverse`,
      },
    ];

    const renderGrid = (props: Partial<IGridProps>) =>
      renderWithTheme(<Grid {...props} />);

    testCases.forEach(({ props, expected }) => {
      renderGrid(props).childNodes.forEach((child) => {
        expect(child).toHaveStyleRule('flex-direction', expected);
      });
    });
  });
  test('should add wrap to container', () => {
    const testCases: TestCaseGrid[] = [
      {
        props: { container: true, wrap: 'wrap' },
        expected: `wrap`,
      },
      {
        props: { container: true, wrap: 'nowrap' },
        expected: `nowrap`,
      },
      {
        props: { container: true, wrap: 'wrap-reverse' },
        expected: `wrap-reverse`,
      },
    ];

    const renderGrid = (props: Partial<IGridProps>) =>
      renderWithTheme(<Grid {...props} />);

    testCases.forEach(({ props, expected }) => {
      renderGrid(props).childNodes.forEach((child) => {
        expect(child).toHaveStyleRule('flex-wrap', expected);
      });
    });
  });
  test('should create auto layout', () => {
    const element = renderWithTheme(
      <Grid container>
        <Grid auto />
        <Grid columns={6} />
      </Grid>
    ).firstChild;
    expect(element).toHaveStyleRule('flex-basis', '0');
    expect(element).toHaveStyleRule('flex-grow', '1');
    expect(element).toHaveStyleRule('max-width', '100%');
  });

  test('should add offset', () => {
    const testCases: TestCaseGrid[] = [
      {
        props: { offset: 1 },
        expected: 'calc(100% * 1 / 12)',
      },
      {
        props: { offset: 9 },
        expected: 'calc(100% * 9 / 12)',
      },
      {
        props: { offset: 12 },
        expected: 'calc(100% * 12 / 12)',
      },
      {
        props: { offset: 'auto' },
        expected: `auto`,
      },
    ];

    const renderGrid = (props: Partial<IGridProps>) =>
      renderWithTheme(
        <Grid container>
          <Grid {...props} />
          <Grid columns={2} />
        </Grid>
      );

    testCases.forEach(({ props, expected }) => {
      const offsetColumn = renderGrid(props).firstChild;
      expect(offsetColumn).toHaveStyleRule('margin-left', expected);
    });
  });
  test('should align items', () => {
    const testCases: TestCaseGrid<{
      alignItems: string;
      justifyContent: string;
    }>[] = [
      {
        props: { alignItems: 'center', justifyContent: 'center' },
        expected: { alignItems: 'center', justifyContent: 'center' },
      },
      {
        props: { alignItems: 'end', justifyContent: 'space-between' },
        expected: { alignItems: 'end', justifyContent: 'space-between' },
      },
    ];

    const renderGrid = (props: Partial<IGridProps>) =>
      renderWithTheme(
        <Grid container>
          <Grid display="flex" {...props} />
        </Grid>
      );

    testCases.forEach(({ props, expected }) => {
      const offsetColumn = renderGrid(props).firstChild;
      expect(offsetColumn).toHaveStyleRule('align-items', expected.alignItems);
      expect(offsetColumn).toHaveStyleRule(
        'justify-content',
        expected.justifyContent
      );
    });
  });

  test('should create nested grid', () => {
    renderWithTheme(
      <Grid container spacing={2}>
        <Grid columns={6} />
        <Grid columns={6} />
        <Grid container columns={6} data-testid="nested-container">
          <Grid columns={6} />
          <Grid columns={6} />
        </Grid>
      </Grid>
    );

    const nestedContainer = screen.getByTestId('nested-container');

    expect(nestedContainer).toHaveStyleRule('min-width', '0');
    expect(nestedContainer).toHaveStyleRule('box-sizing', 'border-box');
    expect(nestedContainer).toHaveStyleRule('display', 'flex');
    expect(nestedContainer).toHaveStyleRule('flex-direction', 'row');
    expect(nestedContainer).toHaveStyleRule('flex-wrap', 'wrap');
    expect(nestedContainer).toHaveStyleRule('margin', `-${theme.spacing(2)}px`);
    expect(nestedContainer).toHaveStyleRule('padding', `${theme.spacing(2)}px`);
    expect(nestedContainer).toHaveStyleRule(
      'width',
      `calc(100% * 6 / 12 + ${(theme.spacing(2) ?? 0) * 2}px)`
    );
  });

  test('should create grid with breakpoint for container and child', () => {
    const testCases: {
      container: TestCaseGrid<WithBreakpoint<object>>;
      child: TestCaseGrid<WithBreakpoint<object>>;
    }[] = [
      {
        container: {
          props: {
            spacing: { sm: 2, lg: 6 },
            wrap: { md: 'wrap', lg: 'nowrap', xl: 'wrap-reverse' },
            direction: { sm: 'row', md: 'column-reverse' },
          },
          expected: {
            sm: {
              'flex-direction': 'row',
            },
            md: {
              'flex-wrap': 'wrap',
              'flex-direction': 'column-reverse',
            },
            lg: {
              'flex-wrap': 'nowrap',
            },
            xl: {
              'flex-wrap': 'wrap-reverse',
            },
          },
        },
        child: {
          props: {
            columns: { xs: 3, sm: 6, lg: 12 },
            justifyContent: { xs: 'center', md: 'start', xl: 'end' },
            alignItems: { xs: 'end', sm: 'center', xl: 'start' },
            offset: { sm: 'auto', md: 4, xl: 10 },
          },
          expected: {
            xs: {
              width: `${(100 / 12) * 3}%`,
              'justify-content': 'center',
              'align-items': 'end',
            },
            sm: {
              padding: `${theme.spacing(2)}px`,
              width: `${(100 / 12) * 6}%`,
              'align-items': 'center',
              'margin-left': 'auto',
            },
            md: {
              'justify-content': 'start',
              'margin-left': 'calc(100% * 4 / 12)',
            },
            lg: {
              padding: `${theme.spacing(6)}px`,
              width: `${(100 / 12) * 12}%`,
            },
            xl: {
              'justify-content': 'end',
              'align-items': 'start',
              'margin-left': 'calc(100% * 10 / 12)',
            },
          },
        },
      },
      {
        container: {
          props: {
            rowSpacing: { xs: 3, md: 4, lg: 5 },
            columnSpacing: { xs: 1, sm: 4, lg: 6 },
            wrap: { xs: 'wrap', md: 'nowrap' },
            direction: { sm: 'column', xl: 'row' },
          },
          expected: {
            xs: {
              'flex-wrap': 'wrap',
            },
            sm: {
              'flex-direction': 'column',
            },
            md: {
              'flex-wrap': 'nowrap',
            },
            lg: {},
            xl: {
              'flex-direction': 'row',
            },
          },
        },
        child: {
          props: {
            columns: { sm: 6, xl: 12 },
            justifyContent: { xs: 'center', md: 'start' },
            alignItems: { sm: 'center', xl: 'start' },
            offset: { lg: 4, xl: 'auto' },
          },
          expected: {
            xs: {
              'padding-top': `${theme.spacing(3)}px`,
              'padding-bottom': `${theme.spacing(3)}px`,
              'padding-right': `${theme.spacing(1)}px`,
              'padding-left': `${theme.spacing(1)}px`,
              'justify-content': 'center',
            },
            sm: {
              'padding-right': `${theme.spacing(4)}px`,
              'padding-left': `${theme.spacing(4)}px`,
              width: `${(100 / 12) * 6}%`,
              'align-items': 'center',
            },
            md: {
              'padding-top': `${theme.spacing(4)}px`,
              'padding-bottom': `${theme.spacing(4)}px`,
              'justify-content': 'start',
            },
            lg: {
              'padding-top': `${theme.spacing(5)}px`,
              'padding-bottom': `${theme.spacing(5)}px`,
              'padding-right': `${theme.spacing(6)}px`,
              'padding-left': `${theme.spacing(6)}px`,
              'margin-left': 'calc(100% * 4 / 12)',
            },
            xl: {
              width: `${(100 / 12) * 12}%`,
              'align-items': 'start',
              'margin-left': 'auto',
            },
          },
        },
      },
    ];

    const renderGrid = (
      container: Partial<IGridProps>,
      child: Partial<IGridProps>
    ) =>
      renderWithTheme(
        <Grid container {...container}>
          <Grid {...child} />
        </Grid>
      );

    testCases.forEach(({ container, child }) => {
      const parentElement = renderGrid(container.props, child.props);
      const childElement = parentElement.firstChild;

      Object.entries(container.expected).forEach(
        ([breakpoint, styleObject]) => {
          Object.entries(styleObject).forEach(([styleKey, style]) => {
            expect(parentElement).toHaveStyleRule(styleKey, style, {
              media: theme.breakpoint.up(breakpoint as BreakpointKey),
            });
          });
        }
      );

      Object.entries(child.expected).forEach(([breakpoint, styleObject]) => {
        Object.entries(styleObject).forEach(([styleKey, style]) => {
          expect(childElement).toHaveStyleRule(styleKey, style, {
            media: theme.breakpoint.up(breakpoint as BreakpointKey),
          });
        });
      });
    });
  });

  // test('should create grid with breakpoint props and without', () => {
  //   const testCases: {
  //     container: TestCaseGrid<WithBreakpoint<object>>;
  //     child: TestCaseGrid<WithBreakpoint<object> & { standard: object }>;
  //   }[] = [
  //     {
  //       container: {
  //         props: {
  //           spacing: 3,
  //           columnSpacing: { sm: 1 },
  //           rowSpacing: { md: 2 },
  //         },
  //         expected: {
  //           sm: {},
  //           md: {},
  //           lg: {},
  //           xl: {},
  //         },
  //       },
  //       child: {
  //         props: {},
  //         expected: {
  //           standard: {
  //             padding: `${theme.spacing(3)}px ${theme.spacing(3)}px`,
  //           },
  //           sm: {
  //             padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
  //           },
  //           md: {
  //             padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  //           },
  //         },
  //       },
  //     },
  //   ];

  //   const renderGrid = (
  //     container: Partial<IGridProps>,
  //     child: Partial<IGridProps>
  //   ) =>
  //     renderWithTheme(
  //       <Grid container {...container}>
  //         <Grid {...child} />
  //       </Grid>
  //     );

  //   testCases.forEach(({ container, child }) => {
  //     const parentElement = renderGrid(container.props, child.props);
  //     const childElement = parentElement.firstChild;

  //     Object.entries(container.expected).forEach(
  //       ([breakpoint, styleObject]) => {
  //         Object.entries(styleObject).forEach(([styleKey, style]) => {
  //           expect(parentElement).toHaveStyleRule(styleKey, style, {
  //             media: theme.breakpoint.up(breakpoint as BreakpointKey),
  //           });
  //         });
  //       }
  //     );

  //     Object.entries(child.expected).forEach(([breakpoint, styleObject]) => {
  //       Object.entries(styleObject).forEach(([styleKey, style]) => {
  //         if (breakpoint === 'standard')
  //           expect(childElement).toHaveStyleRule(styleKey, style);
  //         else
  //           expect(childElement).toHaveStyleRule(styleKey, style, {
  //             media: theme.breakpoint.up(breakpoint as BreakpointKey),
  //           });
  //       });
  //     });
  //   });
  // });
});

import { matchers } from '@emotion/jest';
import { theme as themes } from '@trade-invest/theme';
import Grid from './Grid';
import { renderWithTheme, isElement } from '../test-utilities';
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
    expect(element).toHaveStyleRule(
      'margin',
      `-${theme.spacing(2)}px -${theme.spacing(2)}px`
    );

    element.childNodes.forEach((child) => {
      expect(child).toHaveStyleRule('min-width', '0');
      expect(child).toHaveStyleRule('box-sizing', 'border-box');
      expect(child).toHaveStyleRule('flex-grow', '0');
      expect(child).toHaveStyleRule('flex-basis', 'auto');
      expect(child).toHaveStyleRule('width', '100%');
      expect(child).toHaveStyleRule(
        'padding',
        `${theme.spacing(2)}px ${theme.spacing(2)}px`
      );
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
      expect(child).toHaveStyleRule(
        'padding',
        `${theme.spacing(2)}px ${theme.spacing(2)}px`
      );
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
      expect(child).toHaveStyleRule('padding', `${theme.spacing(2)}px 0px`);
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
      expect(child).toHaveStyleRule('padding', `0px ${theme.spacing(2)}px`);
    });
  });

  test('row and column spacing should overwrite spacing', () => {
    const testCases: TestCaseGrid[] = [
      {
        props: { container: true, spacing: 2, columnSpacing: 1 },
        expected: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
      },
      {
        props: { container: true, spacing: 2, rowSpacing: 1 },
        expected: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      {
        props: { container: true, spacing: 2, rowSpacing: 1, columnSpacing: 1 },
        expected: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
      },
    ];

    const renderGrid = (props: Partial<IGridProps>) =>
      renderWithTheme(
        <Grid {...props}>
          <Grid />
          <Grid />
        </Grid>
      );

    testCases.forEach(({ props, expected }) => {
      renderGrid(props).childNodes.forEach((child) => {
        expect(child).toHaveStyleRule('padding', expected);
      });
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
    expect(nestedContainer).toHaveStyleRule(
      'margin',
      `-${theme.spacing(2)}px -${theme.spacing(2)}px`
    );
    expect(nestedContainer).toHaveStyleRule(
      'padding',
      `${theme.spacing(2)}px ${theme.spacing(2)}px`
    );
    expect(nestedContainer).toHaveStyleRule(
      'width',
      `calc(100% * 6 / 12 + ${(theme.spacing(2) ?? 0) * 2}px)`
    );
  });
});

import { matchers } from '@emotion/jest';
import { theme as themes } from '@trade-invest/theme';
import Grid from './Grid';
import { renderWithTheme, isElement } from '../test-utilities';
jest.mock('@trade-invest/theme');
expect.extend(matchers);

const theme = themes[0];

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

  test('should create two even 12 grid', () => {
    const element = renderWithTheme(
      <Grid container data-testid="container">
        <Grid columns={8} />
        <Grid columns={4} />
        <Grid columns={6} />
        <Grid columns={6} />
      </Grid>
    );

    expect(element.hasChildNodes()).toBeTruthy();

    const childNodess = Array.from(element.childNodes);
    const totalWidthh = childNodess.reduce((acc, curr) => {
      if (isElement(curr)) {
        const width = parseFloat(window.getComputedStyle(curr).width);
        return acc + width;
      }
      return 0;
    }, 0);

    expect(totalWidthh / 2).toBe(100);
  });
});

import { ThemeProvider } from '@emotion/react';
import { theme } from '@trade-invest/theme';
import { render } from '@testing-library/react';

const renderWithTheme = (children: React.ReactNode) => {
  const { container } = render(
    <ThemeProvider theme={theme[0]}>{children}</ThemeProvider>
  );
  return container.firstChild as HTMLElement;
};

export { renderWithTheme };

import { ThemeProvider } from '@emotion/react';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';
import { theme } from '@trade-invest/theme';

// pass ThemeProvider and array of your themes to decorator
addDecorator(withThemes(ThemeProvider, theme));
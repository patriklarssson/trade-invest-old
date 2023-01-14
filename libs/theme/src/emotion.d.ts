import '@emotion/react';
import { CustomTheme } from '@trade-invest/theme';
import { CustomTheme } from './lib/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}

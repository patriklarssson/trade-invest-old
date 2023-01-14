import '@emotion/react';
import { ThemeMy } from '@trade-invest/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends ThemeMy {}
}

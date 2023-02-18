import { CustomTheme } from '../lib/theme';
import { IntRange } from '../lib/types';

const breakPoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const zIndexProps = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

type ZIndex = keyof typeof zIndexProps;
const zIndex = (index: ZIndex | undefined) =>
  index ? zIndexProps[index] : undefined;

const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
] as const;

type Shadow = IntRange<0, typeof shadows.length>;
const shadow = (num: Shadow) => shadows[num];

const distance = [0, 4, 8, 16, 24, 32, 64] as const;
type Spacing = IntRange<0, typeof distance.length>;
const spacing = (num?: Spacing) => (num ? distance[num] : undefined);

export const theme: CustomTheme[] = [
  {
    name: 'Mock theme',
    breakpoint: {
      up: (value: keyof typeof breakPoints) =>
        `@media (min-width:${breakPoints[value]}px)`,
      down: () => '',
      between: () => '',
      only: () => '',
      not: () => '',
    },
    palette: {
      common: {
        black: '#000',
        white: '#fff',
      },
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
        contrastText: '#fff',
      },
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
        contrastText: '#fff',
      },
      warning: {
        main: '#f57c00',
        light: '#ff9800',
        dark: '#e65100',
        contrastText: '#fff',
      },
      info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark: '#01579b',
        contrastText: '#fff',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
        contrastText: '#fff',
      },
      grey: {
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#616161',
        '800': '#424242',
        '900': '#212121',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      background: {
        paper: '#fff',
        default: '#fff',
      },
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(0, 0, 0, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(0, 0, 0, 0.26)',
        disabledBackground: 'rgba(0, 0, 0, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
    spacing: spacing,
    shape: {
      borderRadius: 4,
    },
    border: {
      default: 3,
    },
    shadows: shadow,
    typography: {
      body1: {
        fontSize: 16,
        fontWeight: 400,
        letterSpacing: '0.00938em',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: '0.01071em',
        lineHeight: 1.43,
      },
      button: {
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: '0.02857em',
        lineHeight: 1.75,
        textTransform: 'uppercase',
      },
      caption: {
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: '0.03333em',
        lineHeight: 1.66,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      h1: {
        fontWeight: 300,
        fontSize: 56,
        letterSpacing: '-0.01562em',
        lineHeight: 1.167,
        '@media (min-width:600px)': {
          fontSize: 75,
        },
        '@media (min-width:900px)': {
          fontSize: 85,
        },
        '@media (min-width:1200px)': {
          fontSize: 95,
        },
      },
      h2: {
        fontWeight: 300,
        fontSize: 38,
        letterSpacing: '-0.00833em',
        lineHeight: 1.2,
        '@media (min-width:600px)': {
          fontSize: 50,
        },
        '@media (min-width:900px)': {
          fontSize: 53,
        },
        '@media (min-width:1200px)': {
          fontSize: 60,
        },
      },
      h3: {
        fontWeight: 400,
        fontSize: 32,
        letterSpacing: 0,
        lineHeight: 1.167,
        '@media (min-width:600px)': {
          fontSize: 41,
        },
        '@media (min-width:900px)': {
          fontSize: 45,
        },
        '@media (min-width:1200px)': {
          fontSize: 48,
        },
      },
      h4: {
        fontWeight: 400,
        fontSize: 25,
        letterSpacing: '0.00735em',
        lineHeight: 1.235,
        '@media (min-width:600px)': {
          fontSize: 29,
        },
        '@media (min-width:900px)': {
          fontSize: 32,
        },
      },
      h5: {
        fontWeight: 400,
        fontSize: 20,
        letterSpacing: 0,
        lineHeight: 1.334,
        '@media (min-width:600px)': {
          fontSize: 21,
        },
        '@media (min-width:900px)': {
          fontSize: 24,
        },
      },
      h6: {
        fontWeight: 500,
        fontSize: 18,
        letterSpacing: '0.0075em',
        lineHeight: 1.6,
      },
      inherit: {},
      overline: {
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      subtitle2: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    zIndex: zIndex,
  },
];

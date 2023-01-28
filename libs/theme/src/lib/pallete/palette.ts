import { blue, green, grey, lightBlue, orange, purple, red } from './colors';

const common = {
  black: '#000',
  white: '#fff',
};

export const lightPalette: IPalette = {
  common,
  primary: {
    main: blue[700],
    light: blue[400],
    dark: blue[800],
    contrastText: common.white,
  },
  secondary: {
    main: purple[500],
    light: purple[300],
    dark: purple[700],
    contrastText: common.white,
  },
  error: {
    main: red[700],
    light: red[400],
    dark: red[800],
    contrastText: common.white,
  },
  warning: {
    main: orange[700],
    light: orange[500],
    dark: orange[900],
    contrastText: common.white,
  },
  info: {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900],
    contrastText: common.white,
  },
  success: {
    main: green[800],
    light: green[500],
    dark: green[900],
    contrastText: common.white,
  },
  grey,
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: common.white,
    default: common.white,
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
};

export interface IPalette {
  common: {
    black: string;
    white: string;
  };
  primary: ITypes;
  secondary: ITypes;
  error: ITypes;
  warning: ITypes;
  info: ITypes;
  success: ITypes;
  grey: typeof grey;
  // getContrastText: () => any
  // augmentColor: () => any
  // tonalOffset: number
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    // primaryChannel: string
    // secondaryChannel: string
  };
  divider: string;
  background: {
    paper: string;
    default: string;
  };
  action: {
    active: string;
    hover: string;
    hoverOpacity: number;
    selected: string;
    selectedOpacity: number;
    disabled: string;
    disabledBackground: string;
    disabledOpacity: number;
    focus: string;
    focusOpacity: number;
    activatedOpacity: number;
    // activeChannel: string;
    // selectedChannel: string;
  };
}

interface ITypes {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export type ThemeColors =
  //Common
  | ['common', 'white']
  | ['common', 'black']
  //Primary
  | ['primary', 'main']
  | ['primary', 'light']
  | ['primary', 'dark']
  | ['primary', 'contrastText']
  //Secondary
  | ['secondary', 'main']
  | ['secondary', 'light']
  | ['secondary', 'dark']
  | ['secondary', 'contrastText']
  //Error
  | ['error', 'main']
  | ['error', 'light']
  | ['error', 'dark']
  | ['error', 'contrastText']
  //Warning
  | ['warning', 'main']
  | ['warning', 'light']
  | ['warning', 'dark']
  | ['warning', 'contrastText']
  //Info
  | ['info', 'main']
  | ['info', 'light']
  | ['info', 'dark']
  | ['info', 'contrastText']
  //Success
  | ['success', 'main']
  | ['success', 'light']
  | ['success', 'dark']
  | ['success', 'contrastText']
  //Grey
  | ['grey', '50']
  | ['grey', '100']
  | ['grey', '200']
  | ['grey', '300']
  | ['grey', '400']
  | ['grey', '500']
  | ['grey', '600']
  | ['grey', '700']
  | ['grey', '800']
  | ['grey', '900']
  | ['grey', 'A100']
  | ['grey', 'A200']
  | ['grey', 'A400']
  | ['grey', 'A700']
  //Text
  | ['text', 'primary']
  | ['text', 'secondary']
  | ['text', 'disabled']
  //Divider
  | ['divider']
  //Background
  | ['background', 'paper']
  | ['background', 'default']
  //Action
  | ['action', 'active']
  | ['action', 'hover']
  | ['action', 'hoverOpacity']
  | ['action', 'selected']
  | ['action', 'selectedOpacity']
  | ['action', 'disabled']
  | ['action', 'disabledBackground']
  | ['action', 'disabledOpacity']
  | ['action', 'focus']
  | ['action', 'focusOpacity']
  | ['action', 'activatedOpacity'];

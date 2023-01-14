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

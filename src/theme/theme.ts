import {createTheme} from '@shopify/restyle';

const LABEL_FONT_FAMILY = 'Montserrat-Regular';

const spacing = {
  l: 24,
  m: 16,
  none: 0,
  s: 12,
  xl: 32,
  xs: 8,
  xxl: 50,
  xxs: 6,
  xxxl: 64,
  xxxs: 4,
};

const borderRadii = {
  full: 9999,
  l: 16,
  m: 12,
  none: 0,
  s: 8,
  sm: 10,
  xl: 20,
  xs: 6,
  xxl: 24,
  xxs: 4,
};

// #1C51EF
// #121212
const lightColors = {
  // workaround for shadow colors, that needs opacity
  borderSecondary: '#00000033',
  borderShadowM: '#0B0A0A1A',
  borderShadowS: '#0B0A0A33',
  borderShadowXs: '#0B0A0A1A',

  canvasDanger: '#E54040',
  canvasPrimary: '#ffffff',
  canvasProduct: '#1C51EF',
  canvasSecondary: '#F2F2F2',
  canvasShadow: '#FFFFFF',
  canvasStain: '#FAFAFA',
  canvasSuccess: '#25A764',
  canvasWarning: '#ffe598',

  dangerNeutral: '#cd453d',
  dangerPrimary: '#E54040',
  dangerSecondary: '#aa342c',
  dangerStain: '#ff8080',
  dangerSubdued: '#FFF0EE',

  darkNeutral: '#8f90a6',
  darkPrimary: '#1d1d1f',
  darkSecondary: '#606170',
  darkStain: '#555770',

  inkDanger: '#E54040',
  inkPrimary: '#0B0A0A',
  inkSecondary: '#505153',
  inkSuccess: '#25A764',
  inkTertiary: '#929396',
  inkWarning: '#ffa009',

  lightNeutral: '#fafafc',
  lightPrimary: '#ffffff',
  lightSecondary: '#C8C9D9',
  lightStain: '#f2f2f5',
  lightTertiary: '#949494',

  primaryNeutral: '#003299',
  primaryPrimary: '#1C51EF',
  primarySecondary: '#004fc4',
  primaryStain: '#4481ff',

  productPrimary: '#1C51EF',
  productSecondary: '#0039b0',
  productSubdued: '#EDF4FE',

  secondaryNeutral: '#0494b0',
  secondaryPrimary: '#1d9fb8',
  secondarySecondary: '#146f81',
  secondaryStain: '#61bccd',

  // workaround for shadow colors, that needs opacity
  shadowShadowL: '#0B0A0A2E',
  shadowShadowM: '#0B0A0A21',
  shadowShadowS: '#0B0A0A33',
  shadowShadowXl: '#0B0A0AB3',
  shadowShadowXs: '#0B0A0A0D',

  successNeutral: '#0D8050',
  successPrimary: '#25A764',
  successSecondary: '#07dd80',
  successStain: '#57eba1',
  successSubdued: '#EBF6EE',

  transparent: 'transparent',

  warningNeutral: '#D99E0B',
  warningPrimary: '#ffa009',
  warningSecondary: '#BF8C0A',
  warningStain: '#fded72',
  warningSubdued: '#FFF2E1',
};

const darkColors = {
  borderSecondary: '#FFFFFF33',
  // workaround for shadow colors, that needs opacity dark
  borderShadowM: '#FFFFFF00',
  borderShadowS: '#FFFFFF33',
  borderShadowXs: '#ffffff1A',

  canvasDanger: '#E54040',
  canvasPrimary: '#121212',
  canvasProduct: '#1C51EF',
  canvasSecondary: '#16191D',
  canvasShadow: '#1B1E22',
  canvasStain: '#101214',
  canvasSuccess: '#25A764',
  canvasWarning: '#ffe598',

  dangerNeutral: '#cd453d',
  dangerPrimary: '#E54040',
  dangerSecondary: '#aa342c',
  dangerStain: '#ff8080',
  dangerSubdued: '#26120F',

  darkNeutral: '#888',
  darkPrimary: '#ffffff',
  darkSecondary: '#c7c9d9',
  darkStain: '#f2f2f5',

  inkDanger: '#E54040',
  inkPrimary: '#ffffff',
  inkSecondary: '#C1C2C3',
  inkSuccess: '#25A764',
  inkTertiary: '#87898C',
  inkWarning: '#ffa009',

  lightNeutral: '#000',
  lightPrimary: '#1c1c1c',
  lightSecondary: '#454545',
  lightStain: '#333',
  lightTertiary: '#5E5E5E',

  primaryNeutral: '#0043CC',
  primaryPrimary: '#1C51EF',
  primarySecondary: '#0062F7',
  primaryStain: '#4482FF',

  productPrimary: '#1C51EF',
  productSecondary: '#7aa8ff',
  productSubdued: '#0D1829',

  secondaryNeutral: '#0494b0',
  secondaryPrimary: '#1d9fb8',
  secondarySecondary: '#146f81',
  secondaryStain: '#61bccd',

  // workaround for shadow colors, that needs opacity dark
  shadowShadowL: '#FFFFFF00',
  shadowShadowM: '#FFFFFF00',
  shadowShadowS: '#FFFFFF00',
  shadowShadowXl: '#FFFFFF00',
  shadowShadowXs: '#ffffff00',

  successNeutral: '#0D8050',
  successPrimary: '#25A764',
  successSecondary: '#07dd80',
  successStain: '#57eba1',
  successSubdued: '#0F1A13',

  transparent: 'transparent',

  warningNeutral: '#D99E0B',
  warningPrimary: '#ffa009',
  warningSecondary: '#BF8C0A',
  warningStain: '#fded72',
  warningSubdued: '#201609',
};

const themeColors = {
  ...lightColors,
  black: '#000000',
  staticDark: '#181818',
  staticLight: '#FFFFFF',
  staticOverlay: '#000000b3',
};

const gradientColors = {
  pinkOrange: ['#E30F66', '#EC9329'],
};

const textVariants = {
  defaults: {
    color: 'inkPrimary',
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 22,
  },
  h1: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  h2: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 28,
    lineHeight: 34,
  },
  h3: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 20,
    lineHeight: 29,
  },
  h36: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 36,
    lineHeight: 42,
  },
  label10: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 10,
    lineHeight: 12,
  },
  label12: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 16,
  },
  label14: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 22,
  },
  label16: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 16,
    lineHeight: 22,
  },
  label20: {
    fontFamily: LABEL_FONT_FAMILY,
    fontSize: 20,
    lineHeight: 29,
  },
};

const buttonVariants = {
  danger: {
    backgroundColor: 'dangerPrimary',
  },
  defaults: {
    backgroundColor: 'canvasPrimary',
    borderRadius: 's',
  },
  outline: {
    backgroundColor: 'canvasPrimary',
    borderColor: 'productPrimary',
    borderWidth: 1,
  },
  primary: {
    backgroundColor: 'productPrimary',
    borderColor: 'productPrimary',
    borderWidth: 1,
  },
};

const shadowVariants = {
  defaults: {},
  shadowL: {
    backgroundColor: 'canvasShadow',
    elevation: 24,
    shadowColor: 'shadowShadowL',
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  shadowM: {
    backgroundColor: 'canvasShadow',
    borderColor: 'borderShadowM',
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: 'shadowShadowM',
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  shadowS: {
    backgroundColor: 'canvasShadow',
    borderColor: 'borderShadowS',
    borderWidth: 0.5,
    elevation: 2,
    shadowColor: 'shadowShadowS',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  shadowXl: {
    backgroundColor: 'canvasShadow',
    elevation: 24,
    shadowColor: 'shadowShadowXl',
    shadowOffset: {height: 8, width: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  shadowXs: {
    backgroundColor: 'canvasShadow',
    borderColor: 'borderShadowXs',
    borderWidth: 0.5,
    elevation: 1,
    shadowColor: 'shadowShadowXs',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 1,
    shadowRadius: 2,
  },
};

const defaultTheme = createTheme({
  borderRadii,
  buttonVariants,
  colors: themeColors,
  gradientColors,
  shadowVariants,
  spacing,
  textVariants,
});
export type Theme = typeof defaultTheme;

export const lightTheme = defaultTheme;
export const darkTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    ...darkColors,
  },
};

import { black, white } from './constants'

export const monoChromaticPalette = {
  color1: '#eeeeee',
  color2: '#aeaeae',
  color3: '#909090',
  color4: '#5c5c5c',
}

export const primaryColors = {
  main: '#4fa760',
  light: '#D30000',
  dark: 'transparent',
} as const

export const brandColors = {
  primary: primaryColors,

  surface: {
    primary: '#F9EBB4',
    secondary: 'rgba(255, 255, 255, 0.5)',
    tertiary: 'rgba(92, 92, 92, 0.74)',
    contrast: 'transparent',
    background: '#4fa760',
  },

  bodyText: {
    primary: black,
    secondary: '#333333',
    contrast: white,
  },

  state: {
    success: {
      primary: 'transparent',
      secondary: 'transparent',
    },
    warning: {
      primary: 'transparent',
      secondary: 'transparent',
    },
    error: {
      primary: '#b72121',
      secondary: '#8c2b2b',
    },
  },

  border: {
    primary: black,
    activeHover: '#b60303',
    contrast: 'transparent',
  },
} as const

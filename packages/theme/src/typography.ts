import type { TypographyOptions, TypographyStyle } from '@mui/material/styles/createTypography'
import type { TypographyVariantsOptions } from '@mui/material/styles/index'

import * as webFontStyle from './fonts/font-style'

const { fontFamily, headingsFontFamily, htmlFontSize, fontWeightRegular, fontWeightMedium, fontWeightBold } =
  webFontStyle

export const variants: TypographyVariantsOptions = {
  h1: {
    fontFamily: headingsFontFamily,
    fontSize: 48,
    lineHeight: 1.333_33,
    /* [breakpoints.down('md')]: {
      // h1 looks like h3 on mobile
      fontSize: 24,
      lineHeight: 1.333_33,
    }, */
  },
  h2: {
    fontFamily: headingsFontFamily,
    fontSize: 32,
    lineHeight: 1.5,
    /* [breakpoints.down('md')]: {
      // h2 looks like h4 on mobile
      fontSize: 20,
      lineHeight: 1.4,
    }, */
  },
  h3: {
    fontFamily: headingsFontFamily,
    fontSize: 24,
    lineHeight: 1.333_33,
    /* [breakpoints.down('md')]: {
      // h3 looks like h5 on mobile
      fontSize: 16,
      lineHeight: 1.5,
    }, */
  },
  h4: {
    fontFamily: headingsFontFamily,
    fontSize: 20,
    lineHeight: 1.4,
  },
  h5: {
    fontFamily: headingsFontFamily,
    fontSize: 16,
    lineHeight: 1.5,
  },
  S: {
    fontFamily,
    fontSize: 12,
    lineHeight: 1.333_33,
  },
  M: {
    fontFamily,
    fontSize: 14,
    lineHeight: 1.428_57,
  },
  L: {
    fontFamily,
    fontSize: 16,
    lineHeight: 1.5,
  },
  XL: {
    fontFamily,
    fontSize: 18,
    lineHeight: 1.777_78,
  },
  // Disable unwanted built-in variants
  h6: undefined as unknown as TypographyStyle,
  body1: undefined as unknown as TypographyStyle,
  body2: undefined as unknown as TypographyStyle,
  button: undefined as unknown as TypographyStyle,
  caption: undefined as unknown as TypographyStyle,
  overline: undefined as unknown as TypographyStyle,
  subtitle1: undefined as unknown as TypographyStyle,
  subtitle2: undefined as unknown as TypographyStyle,
}

export const typography: TypographyOptions = {
  fontFamily,
  htmlFontSize,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  fontWeightLight: false,
  ...variants,
}

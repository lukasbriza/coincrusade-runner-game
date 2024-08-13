import type { PaletteOptions } from '@mui/material/styles/index'

import { white, black } from './colors/constants'
import { brandColors } from './colors/index'

export const palette: PaletteOptions = {
  primary: brandColors.primary,
  bodyText: brandColors.bodyText,
  surface: brandColors.surface,
  border: brandColors.border,
  state: brandColors.state,
  common: {
    white,
    black,
  },
  mode: 'dark',
}

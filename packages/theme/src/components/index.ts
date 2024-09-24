import type { Components } from '@mui/material/styles/index'

import type { WebTheme } from '../types'

import { MuiTypography } from './mui-typography'

export const components: Components<Omit<WebTheme, 'components'>> = {
  MuiTypography,
}

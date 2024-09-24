import type { Components } from '@mui/material/styles/index'
import type { Theme } from '@mui/system'

export const MuiTypography = {
  defaultProps: {
    color: 'bodyText.primary',
    variantMapping: {
      S: 'span',
      M: 'div',
      L: 'p',
      XL: 'p',
    },
  },
} satisfies Components<Theme>['MuiTypography']

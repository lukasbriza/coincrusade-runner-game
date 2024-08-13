import type { ButtonProps as ButtonMuiProps } from '@mui/base'

import type { ComponentBaseProps } from '../types'

export type ButtonProps = ComponentBaseProps & {
  type?: ButtonMuiProps['type']
  text: string
  borderWidth?: number | undefined
}

import type { ChangeEvent, SyntheticEvent } from 'react'

import type { InputBaseProps } from '../types'

export type StringInputProps = InputBaseProps & {
  onBlur?: (event: SyntheticEvent) => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

import type { ChangeEvent, SyntheticEvent } from 'react'

import type { InputBaseProps } from '../types'

export type TextAreaProps = InputBaseProps & {
  onBlur?: (event: SyntheticEvent) => void
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

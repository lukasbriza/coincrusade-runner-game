import { forwardRef } from 'react'

import { StringInput } from '../string-input'

import type { NumberInputProps } from './types'

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, defaultValue, ...restProps }, ref) => (
    <StringInput
      {...restProps}
      ref={ref}
      defaultValue={defaultValue === undefined ? defaultValue : String(defaultValue)}
      type="number"
      value={value === undefined ? value : String(value)}
    />
  ),
)

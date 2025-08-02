import type { NumberInputProps, StringInputProps, TextAreaProps } from '@lukasbriza/components'
import type { Control, FieldValues } from 'react-hook-form'

export type StringInputControlledProps<T extends FieldValues> = Omit<
  StringInputProps,
  'error' | 'onBlur' | 'onChange' | 'value'
> & {
  control: Control<T>
}

export type TextAreaControlledProps<T extends FieldValues> = Omit<
  TextAreaProps,
  'error' | 'onBlur' | 'onChange' | 'value'
> & {
  control: Control<T>
}

export type NumberInputControlledProps<T extends FieldValues> = Omit<
  NumberInputProps,
  'error' | 'onBlur' | 'onChange' | 'value'
> & {
  control: Control<T>
}

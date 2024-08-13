import type { StringInputProps, TextAreaProps } from '@lukasbriza/components'
import type { Control, FieldValues } from 'react-hook-form'

export type StringInputControlledProps = Omit<StringInputProps, 'error' | 'onBlur' | 'onChange' | 'value'> & {
  control: Control<FieldValues>
}

export type TextAreaControlledProps = Omit<TextAreaProps, 'error' | 'onBlur' | 'onChange' | 'value'> & {
  control: Control<FieldValues>
}

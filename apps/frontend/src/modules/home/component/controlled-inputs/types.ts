import type { NumberInputProps, StringInputProps, TextAreaProps } from '@lukasbriza/components'
import type { Control } from 'react-hook-form'

import type { ContactFormInputs } from '../../sections/contact-section/types'

export type StringInputControlledProps = Omit<StringInputProps, 'error' | 'onBlur' | 'onChange' | 'value'> & {
  control: Control<ContactFormInputs>
}

export type TextAreaControlledProps = Omit<TextAreaProps, 'error' | 'onBlur' | 'onChange' | 'value'> & {
  control: Control<ContactFormInputs>
}

export type NumberInputControlledProps = Omit<NumberInputProps, 'error' | 'onBlur' | 'onChange' | 'value'> & {
  control: Control<ContactFormInputs>
}

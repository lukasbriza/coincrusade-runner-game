import type { StringInputProps } from '../string-input'

export type NumberInputProps = Omit<StringInputProps, 'defaultValue' | 'type' | 'value'> & {
  value: number | undefined
  defaultValue?: number | undefined
}

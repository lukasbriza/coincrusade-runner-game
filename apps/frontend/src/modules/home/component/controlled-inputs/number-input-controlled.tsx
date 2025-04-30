/* eslint-disable react/jsx-props-no-spreading */
import { NumberInput } from '@lukasbriza/components'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import type { NumberInputControlledProps } from './types'

export const NumberInputControlled = <T extends FieldValues>({
  control,
  name,
  helper,
  ...props
}: NumberInputControlledProps<T>) => {
  if (!control) {
    return null
  }

  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <NumberInput
          ref={ref}
          error={!!error?.message}
          helper={error?.message || helper}
          name={name}
          value={value as number}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
        />
      )}
    />
  )
}

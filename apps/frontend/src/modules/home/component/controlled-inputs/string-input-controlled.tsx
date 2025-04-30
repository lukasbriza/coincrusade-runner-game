/* eslint-disable react/jsx-props-no-spreading */

import { StringInput } from '@lukasbriza/components'
import type { FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import type { StringInputControlledProps } from './types'

export const StringInputControlled = <T extends FieldValues>({
  control,
  name,
  helper,
  ...props
}: StringInputControlledProps<T>) => {
  if (!control) {
    return null
  }
  return (
    <Controller
      name={name}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <StringInput
          ref={ref}
          error={!!error?.message}
          helper={error?.message || helper}
          name={name}
          value={value as string}
          onBlur={onBlur}
          onChange={onChange}
          {...props}
        />
      )}
    />
  )
}

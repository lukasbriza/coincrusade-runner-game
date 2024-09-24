/* eslint-disable react/jsx-props-no-spreading */

import { TextArea } from '@lukasbriza/components'
import type { FC } from 'react'
import { Controller } from 'react-hook-form'

import type { TextAreaControlledProps } from './types'

export const TextAreaControlled: FC<TextAreaControlledProps> = ({ control, name, helper, ...props }) => {
  if (!control) {
    return null
  }

  return (
    <Controller
      name={name}
      render={({ field: { onBlur, onChange, value, ref }, fieldState: { error } }) => (
        <TextArea
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

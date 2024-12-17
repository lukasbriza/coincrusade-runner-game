'use client'

import type { ChangeEvent, SyntheticEvent } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { HelperBase, RequiredBase, RootBase } from '../styles'

import { Label, TextAreaStyled } from './styles'
import type { TextAreaProps } from './types'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      fullWidth = false,
      borderWidth = 3,
      onBlur,
      onChange,
      disabled,
      value,
      name,
      error,
      label,
      required,
      helper,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false)
    const [filled, setFilled] = useState(false)
    const labelRef = useRef<HTMLLabelElement>(null)

    const handleFocus = () => {
      setFocused(true)
    }

    const handleBlur = (event: SyntheticEvent) => {
      onBlur?.(event)
      setFocused(false)
    }

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => onChange?.(event)

    useEffect(() => {
      if (value !== undefined && value.length > 0) {
        setFilled(true)
      } else {
        setFilled(false)
      }
    }, [value])

    return (
      <RootBase data-testid="textarea" ownerState={{ fullWidth }}>
        <Label
          ref={labelRef}
          htmlFor={name}
          ownerState={{
            borderWidth,
            error,
            disabled,
            animate: focused || filled,
            labelHeight: labelRef.current?.clientHeight,
          }}
        >
          {label}
        </Label>
        <TextAreaStyled
          ref={ref}
          disabled={disabled ?? false}
          error={error}
          multiline
          name={name}
          ownerState={{ borderWidth }}
          slotProps={{ input: { value } }}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          {...props}
        />
        {required && <RequiredBase>*</RequiredBase>}
        <HelperBase ownerState={{ disabled, error }}>{helper}</HelperBase>
      </RootBase>
    )
  },
)

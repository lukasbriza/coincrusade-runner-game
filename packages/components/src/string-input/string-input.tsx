'use client'

import type { ChangeEvent, SyntheticEvent } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { HelperBase, RequiredBase, RootBase } from '../styles'

import { Label, StringInputStyled } from './styles'
import type { StringInputProps } from './types'

export const StringInput = forwardRef<HTMLInputElement, StringInputProps>(
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange?.(event)

    useEffect(() => {
      if (value !== undefined && value.length > 0) {
        setFilled(true)
      } else {
        setFilled(false)
      }
    }, [value])

    return (
      <RootBase ownerState={{ fullWidth }}>
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
        <StringInputStyled
          ref={ref}
          disabled={disabled ?? false}
          error={error}
          multiline={false}
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
        <HelperBase ownerState={{ error, disabled }}>{helper}</HelperBase>
      </RootBase>
    )
  },
)

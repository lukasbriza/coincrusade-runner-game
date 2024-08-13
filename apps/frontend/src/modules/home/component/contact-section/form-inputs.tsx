'use client'

import { Button } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { StringInputControlled, TextAreaControlled } from '../controlled-inputs'

import { FormInputsRoot } from './styles'

export const FormInputs: FC = () => {
  const t = useTranslations('home.contact.form')
  const { control } = useFormContext()
  return (
    <FormInputsRoot>
      <StringInputControlled control={control} fullWidth label={t('email')} name="email" />
      <TextAreaControlled control={control} fullWidth label={t('message')} name="message" />
      <Button text={t('send')} type="submit" />
    </FormInputsRoot>
  )
}
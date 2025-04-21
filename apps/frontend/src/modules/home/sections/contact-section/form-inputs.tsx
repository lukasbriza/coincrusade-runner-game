'use client'

import { Button } from '@lukasbriza/components'
import type { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { useScopedI18n } from '@/i18n/client'

import { StringInputControlled, TextAreaControlled } from '../../component/controlled-inputs'

import { FormInputsRoot } from './styles'
import type { ContactFormInputs, FormInputsProps } from './types'

export const FormInputs: FC<FormInputsProps> = ({ disabled }) => {
  const t = useScopedI18n('home.contact.form')
  const { control } = useFormContext<ContactFormInputs>()

  return (
    <FormInputsRoot>
      <StringInputControlled control={control} fullWidth label={t('email')} name="email" />
      <TextAreaControlled control={control} fullWidth label={t('message')} name="message" />
      <Button disabled={disabled} text={t('send')} type="submit" />
    </FormInputsRoot>
  )
}

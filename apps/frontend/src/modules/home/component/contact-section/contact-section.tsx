/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { useTranslations } from 'next-intl'
import { type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormInputs } from './form-inputs'
import { FormRoot, FormText, Header, Root } from './styles'
import type { ContactFormInputs } from './types'

export const ContactSection: FC = () => {
  const t = useTranslations('home.contact')
  const methods = useForm<ContactFormInputs>({
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: ContactFormInputs) => {
    await fetch('/')
    console.log(data)
  }

  return (
    <Root>
      <FormProvider {...methods}>
        <FormRoot onSubmit={methods.handleSubmit(onSubmit)}>
          <Header variant="h1">{t('header')}</Header>
          <FormText variant="h5">{t('text')}</FormText>
          <FormInputs />
        </FormRoot>
      </FormProvider>
    </Root>
  )
}

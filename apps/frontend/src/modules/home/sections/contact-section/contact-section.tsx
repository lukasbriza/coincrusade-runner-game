/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { GithubIcon, MailIcon, Text } from '@lukasbriza/components'
import { type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useScopedI18n } from '@/i18n/client'
import { anchors } from '@/shared'

import { FormInputs } from './form-inputs'
import { FormRoot, FormText, Header, InfoIcon, InfoSection, Root } from './styles'
import type { ContactFormInputs } from './types'

export const ContactSection: FC = () => {
  const t = useScopedI18n('home.contact')
  const methods = useForm<ContactFormInputs>({
    reValidateMode: 'onChange',
  })

  const onSubmit = async (data: ContactFormInputs) => {
    await fetch('/')
    // eslint-disable-next-line no-console
    console.log(data)
  }

  return (
    <Root>
      <FormProvider {...methods}>
        <FormRoot onSubmit={methods.handleSubmit(onSubmit)}>
          <Header id={anchors[2].path} variant="h1">
            {t('header')}
          </Header>
          <FormText variant="h5">{t('text')}</FormText>
          <FormInputs />
          <InfoSection>
            <InfoIcon
              href={process.env.NEXT_PUBLIC_GITHUB}
              referrerPolicy="no-referrer"
              rel="external noreferrer"
              target="_blank"
            >
              <GithubIcon size={32} />
              <Text variant="S">{t('info.github')}</Text>
            </InfoIcon>
            <InfoIcon href={`mailto:${process.env.NEXT_PUBLIC_MAIL}`} rel="noreferrer" target="_blank">
              <MailIcon size={40} />
              <Text variant="S">{process.env.NEXT_PUBLIC_MAIL}</Text>
            </InfoIcon>
          </InfoSection>
        </FormRoot>
      </FormProvider>
    </Root>
  )
}

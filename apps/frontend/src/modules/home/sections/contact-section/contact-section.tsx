/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { GithubIcon, MailIcon, Text } from '@lukasbriza/components'
import { useCallback, useEffect, useState, type FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useScopedI18n } from '@/i18n/client'
import type { CoincrusadeSocket, MailRto } from '@/lib/socket-io'
import { getSocketContext } from '@/lib/socket-io'
import { SOCKET_EVENTS } from '@/lib/socket-io/events'
import { anchors } from '@/shared'
import { SocketSnackbar } from '@/shared/components'
import { useSnackbarContext, useSocketContext } from '@/shared/context'

import { FormInputs } from './form-inputs'
import { FormRoot, FormText, Header, InfoIcon, InfoSection, Root } from './styles'
import type { ContactFormInputs } from './types'
import { schema } from './validations'

export const ContactSection: FC = () => {
  const [loading, setLoading] = useState(false)

  const tContact = useScopedI18n('home.contact')
  const tSnackbar = useScopedI18n('snackbars')
  const { socket } = useSocketContext()
  const { addSnackbar } = useSnackbarContext()
  const methods = useForm<ContactFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  })

  const handleMailRepsonse = useCallback(
    (event: Event) => {
      const { detail } = event as CustomEvent<{ socket: CoincrusadeSocket; response: MailRto }>
      const { response } = detail
      setLoading(false)

      if (response.success) {
        addSnackbar(<SocketSnackbar message={tSnackbar('mailSendSuccess')} />)
        methods.setValue('email', '')
        methods.setValue('message', '')
      }

      if (!response.success) {
        addSnackbar(<SocketSnackbar message={tSnackbar('mailSendError')} />)
      }
    },
    [methods, addSnackbar, tSnackbar],
  )

  const onSubmit = (data: ContactFormInputs) => {
    if (!socket) {
      // SNACKBAR NOT AVAILABLE
      addSnackbar(<SocketSnackbar message={tSnackbar('serverConnectionError')} />)
      return
    }
    const subject = `Contact form <${data.email}>`
    const text = data.message

    setLoading(true)
    const sc = getSocketContext()
    sc?.socket?.emit('mail-send', { subject, text })
  }

  useEffect(() => {
    window.addEventListener(SOCKET_EVENTS.MAIL_SEND_RESPONSE, handleMailRepsonse)

    return () => {
      window.removeEventListener(SOCKET_EVENTS.MAIL_SEND_RESPONSE, handleMailRepsonse)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Root>
      <FormProvider {...methods}>
        <FormRoot onSubmit={methods.handleSubmit(onSubmit)}>
          <Header id={anchors[2].path} variant="h1">
            {tContact('header')}
          </Header>
          <FormText variant="h5">{tContact('text')}</FormText>
          <FormInputs disabled={methods.formState.isSubmitting || loading} />
          <InfoSection>
            <InfoIcon
              href={process.env.NEXT_PUBLIC_GITHUB}
              referrerPolicy="no-referrer"
              rel="external noreferrer"
              target="_blank"
            >
              <GithubIcon size={32} />
              <Text variant="S">{tContact('info.github')}</Text>
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

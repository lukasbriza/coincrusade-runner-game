'use client'

import { Text } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

import { SnackbarContentBase } from './styles'

export const MobileVerificationSnackbar: FC = () => {
  const t = useTranslations('snackbars')
  return (
    <SnackbarContentBase>
      <Text variant="S">{t('mobileVerification')}</Text>
    </SnackbarContentBase>
  )
}

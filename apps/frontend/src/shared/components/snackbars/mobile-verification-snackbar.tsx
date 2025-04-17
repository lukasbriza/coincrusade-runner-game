'use client'

import { Text } from '@lukasbriza/components'
import type { FC } from 'react'

import { useScopedI18n } from '@/i18n/client'

import { SnackbarContentBase } from './styles'

export const MobileVerificationSnackbar: FC = () => {
  const t = useScopedI18n('snackbars')
  return (
    <SnackbarContentBase>
      <Text variant="S">{t('mobileVerification')}</Text>
    </SnackbarContentBase>
  )
}

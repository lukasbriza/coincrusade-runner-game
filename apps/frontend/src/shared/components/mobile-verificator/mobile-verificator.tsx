'use client'

import { useEffect, type FC } from 'react'

import { useInitialAnimationContext, useSnackbarContext } from '@/shared/context'
import { isMobile } from '@/utils'

import { MobileVerificationSnackbar } from '../snackbars'

export const MobileVerificator: FC = () => {
  const { addSnackbar } = useSnackbarContext()
  const { initialised } = useInitialAnimationContext()

  useEffect(() => {
    if (initialised && isMobile()) {
      addSnackbar(<MobileVerificationSnackbar />)
    }
  }, [addSnackbar, initialised])

  return null
}

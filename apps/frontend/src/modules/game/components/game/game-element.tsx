'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { useRouter } from '@/i18n/routing'
import { gameRestartEmiter } from '@/lib/phaser/events'
import { GAME_INITIATED_STORAGE_KEY, routes } from '@/shared'
import { MobileVerificationSnackbar } from '@/shared/components'
import { useSnackbarContext } from '@/shared/context'
import { getItem, isMobile } from '@/utils'

import { LoadingScreen } from '../loading-screen'
import { SettingsPergamen } from '../settings-pergamen'

import { gameClasses } from './classes'
import { GameUiOverlay } from './styles'

export const GameElement: FC = () => {
  const router = useRouter()
  const { addSnackbar } = useSnackbarContext()

  useEffect(() => {
    const initiated = getItem(GAME_INITIATED_STORAGE_KEY)

    if (initiated === 'true' && !isMobile()) {
      gameRestartEmiter()
    }
  }, [])

  useEffect(() => {
    if (isMobile()) {
      addSnackbar(<MobileVerificationSnackbar />)
      router.push(routes.home)
    }
  }, [addSnackbar, router])

  return (
    <>
      <GameUiOverlay className={gameClasses.gameUiOverlay}>
        <SettingsPergamen />
      </GameUiOverlay>
      <LoadingScreen />
    </>
  )
}

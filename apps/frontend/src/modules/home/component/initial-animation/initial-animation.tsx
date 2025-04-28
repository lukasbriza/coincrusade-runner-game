'use client'

import { HeroText } from '@lukasbriza/components'
import { useEffect, type FC } from 'react'

import { useScopedI18n } from '@/i18n/client'
import { GAME_INITIATED_STORAGE_KEY, LANGUAGE_CHANGED_STORAGE_KEY, useRepeatableCall } from '@/shared'
import { useInitialAnimationContext } from '@/shared/context'
import { getItem, removeItem } from '@/utils'

import { useApertureContext } from '../../context/aperture-context'

import { animation } from './animation'
import { animationClasses } from './classes'
import { Root } from './styles'
import { disableScroll, enableScroll, trigerPergamenAdjustment } from './utils'

export const InitialAnimation: FC = () => {
  const { setStage, disableAperture, loaded } = useApertureContext()
  const { setInitialised, initialised } = useInitialAnimationContext()
  const { startCall } = useRepeatableCall(trigerPergamenAdjustment, 50, 30)
  const t = useScopedI18n('home')

  useEffect(() => {
    const redirectedFromGame = getItem(GAME_INITIATED_STORAGE_KEY)
    const languageChanged = getItem(LANGUAGE_CHANGED_STORAGE_KEY)

    if (redirectedFromGame === 'true' || languageChanged === 'true') {
      setInitialised(true)
      disableAperture()
      removeItem(LANGUAGE_CHANGED_STORAGE_KEY)
      startCall()
      return
    }

    if (loaded && !initialised) {
      disableScroll()
      animation(setStage)
        .then(() => {
          setInitialised(true)
          disableAperture()
          enableScroll()
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('Initial animation failed.')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, initialised])

  return (
    <Root ownerState={{ apertureLoaded: loaded }}>
      <HeroText
        className={animationClasses.hero}
        main={t('heroMain')}
        mainClassName={animationClasses.main}
        subtitle={t('heroSubtitle')}
        subtitleClassName={animationClasses.subtitle}
      />
    </Root>
  )
}

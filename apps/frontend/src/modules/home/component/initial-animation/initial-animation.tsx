'use client'

import { HeroText } from '@lukasbriza/components'
import { useEffect, type FC } from 'react'

import { useScopedI18n } from '@/i18n/client'
import { GAME_INITIATED_STORAGE_KEY } from '@/shared'
import { useInitialAnimationContext } from '@/shared/context'
import { getItem } from '@/utils'

import { useApertureContext } from '../../context/aperture-context'

import { animation } from './animation'
import { animationClasses } from './classes'
import { Root } from './styles'

export const InitialAnimation: FC = () => {
  const { setStage, disableAperture, loaded } = useApertureContext()
  const { setInitialised, initialised } = useInitialAnimationContext()
  const t = useScopedI18n('home')

  useEffect(() => {
    const redirecteFromGame = getItem(GAME_INITIATED_STORAGE_KEY)

    if (redirecteFromGame === 'true') {
      setInitialised(true)
      disableAperture()
      return
    }

    if (loaded && !initialised) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      animation(setStage).then(() => {
        setInitialised(true)
        disableAperture()
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

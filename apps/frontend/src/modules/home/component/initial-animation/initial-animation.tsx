'use client'

import { HeroText } from '@lukasbriza/components'
import { useTranslations } from 'next-intl'
import { useEffect, type FC } from 'react'

import { useApertureContext } from '../../context/aperture-context'

import { animation } from './animation'
import { animationClasses } from './classes'
import { Root } from './styles'

export const InitialAnimation: FC = () => {
  const { setStage, loaded } = useApertureContext()
  const t = useTranslations('home')

  useEffect(() => {
    if (loaded) {
      animation(setStage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

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

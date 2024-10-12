/* eslint-disable @typescript-eslint/no-floating-promises */
import gsap from 'gsap'

import { pageWrapperClasses } from '@/shared/components'

import type { StageValue } from '../../context/aperture-context'
import { engineSelectorClasses } from '../engine-selector'

import { animationClasses } from './classes'

export const animation = (setStage: (value: StageValue) => void) => {
  const tl = gsap.timeline()

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  tl.set('html', { overflow: 'hidden' })
    .set(`.${engineSelectorClasses.root}`, {
      zIndex: -1,
      opacity: 0,
    })
    .set(`.${pageWrapperClasses.menuItems}`, { opacity: 0 })
    .addLabel('start')
    .call(() => setStage(2), undefined, 'start')
    .to(
      `.${animationClasses.hero}`,
      {
        opacity: 1,
        delay: 1.5,
        duration: 0.5,
        ease: 'power2.in',
      },
      'start',
    )
    .addLabel('pause')
    .call(() => setStage(3), undefined, '+=3')
    .to(
      `.${animationClasses.hero}`,
      {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        ease: 'power2.in',
      },
      'pause',
    )
    .addLabel('afterAnimation')
    .to(
      `.${pageWrapperClasses.menuItems}`,
      {
        opacity: 1,
        ease: 'power2.in',
        delay: 2,
        duration: 0.5,
      },
      'afterAnimation',
    )
    .set(`.${engineSelectorClasses.root}`, { clearProps: 'z-index' }, 'afterAnimation')
    .to(
      `.${engineSelectorClasses.root}`,
      {
        opacity: 1,
        ease: 'power2.in',
        delay: 2,
        duration: 0.5,
      },
      'afterAnimation',
    )
    .then(() => {
      gsap.set(`.${engineSelectorClasses.root}`, { clearProps: 'opacity' })
      gsap.set(`.${pageWrapperClasses.menuItems}`, { clearProps: 'opacity' })
      gsap.set('html', { clearProps: 'overflow' })
    })
}

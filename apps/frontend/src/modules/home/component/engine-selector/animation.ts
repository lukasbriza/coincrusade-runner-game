import gsap from 'gsap'

import { engines } from '@/shared'

import { engineSelectorClasses } from './classes'
import type { MinimizeInput } from './types'

export const fadeOffText = (callback: () => void) => {
  const tl = gsap.timeline()
  tl.to(`.${engineSelectorClasses.content}`, {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: callback,
  })
}

export const fadeInText = (callback?: () => void) => {
  const tl = gsap.timeline()
  tl.to(`.${engineSelectorClasses.content}`, {
    opacity: 1,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => callback?.(),
  })
}

export const minimizeScroll = (input: MinimizeInput) => {
  const { pergamen, root } = input
  const pergamenTop = root.clientHeight * 0.7 - pergamen.clientHeight / 3

  const tl = gsap.timeline()
  tl.addLabel('start').to(
    pergamen,
    {
      ease: 'power2.inOut',
      duration: 1,
      scale: 0.3,
      top: pergamenTop,
    },
    'start',
  )
}

export const hideArrows = () => {
  const tl = gsap.timeline()
  tl.addLabel('start').to(
    [`.${engineSelectorClasses.leftArrow}`, `.${engineSelectorClasses.rightArrow}`],
    {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
    },
    'start',
  )
}

export const showArrows = (actualGenerator: number) => {
  const ln = engines.length
  const selector: string[] = []

  gsap.set([`.${engineSelectorClasses.leftArrow}`, `.${engineSelectorClasses.rightArrow}`], { clearProps: 'opacity' })

  if (actualGenerator === 0) {
    selector.push(`.${engineSelectorClasses.rightArrow}`)
  }

  if (actualGenerator === ln - 1) {
    selector.push(`.${engineSelectorClasses.leftArrow}`)
  }

  if (actualGenerator > 0 && actualGenerator < ln - 1) {
    selector.push(`.${engineSelectorClasses.leftArrow}`, `.${engineSelectorClasses.rightArrow}`)
  }

  const tl = gsap.timeline()
  tl.addLabel('start').to(
    [`.${engineSelectorClasses.leftArrow}`, `.${engineSelectorClasses.rightArrow}`],
    {
      opacity: 1,
      duration: 1,
      ease: 'power1.out',
      onComplete: () => {
        gsap.set(selector, {
          clearProps: 'opacity',
        })
      },
    },
    'start',
  )
}

export const unminimizeScroll = (input: MinimizeInput, callback: () => void) => {
  const { pergamen } = input
  const tl = gsap.timeline()
  tl.addLabel('start').to(
    pergamen,
    {
      ease: 'power2.inOut',
      duration: 1,
      scale: 1,
      top: 0,
      onComplete: () => {
        gsap.set(pergamen, { clearProps: 'scale' })
        gsap.set(pergamen, { clearProps: 'min-height' })
        callback?.()
      },
    },
    'start',
  )
}

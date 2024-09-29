/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import gsap from 'gsap'

import { pergamenClasses } from './classes'
import type { RollAnimationInput } from './types'
import { getOpenedPergamenBottomPosition, getOpenedPergamenTopPosition } from './utils'

export const rollScroll = (input: RollAnimationInput, callback: () => void) => {
  const { pergamen, top, bottom, ribbon } = input
  const pergamenHeight = pergamen.height
  const topPosition = getOpenedPergamenTopPosition(pergamen, top)
  const bottomPosition = getOpenedPergamenBottomPosition(pergamen, bottom)

  const animationDuration = 1
  const ease = 'power1.inOut'
  const tl = gsap.timeline()

  tl.addLabel('start')
    .set([pergamen, top, bottom, ribbon], { clearProps: 'transition' }, 'start')
    .set(pergamen, { minHeight: 0 }, 'start')
    .to(
      pergamen,
      {
        height: 0,
        ease,
        duration: animationDuration + 0.15,
      },
      'start',
    )
    .to(
      top,
      {
        top: topPosition - top.height / 4 + pergamenHeight / 2,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      bottom,
      {
        top: bottomPosition + bottom.height / 4 - pergamenHeight / 2,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      ribbon,
      {
        top: topPosition - top.height / 4 + 10 + pergamenHeight / 2,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      `.${pergamenClasses.content}`,
      {
        height: 0,
        ease,
        duration: animationDuration + 0.15,
      },
      'start',
    )
    .then(callback)
}

export const unRollScroll = (input: RollAnimationInput, callback: () => void) => {
  const { pergamen, top, bottom, ribbon } = input
  const tl = gsap.timeline()

  const containerHeight = pergamen.parentElement?.clientHeight || 0
  const pergamenHeight = containerHeight * 0.6 < 400 ? 400 : containerHeight * 0.6
  const topTop = (containerHeight - pergamenHeight) / 2 - top.height / 2
  const bottomtop = (containerHeight - pergamenHeight) / 2 + pergamenHeight - bottom.height / 2
  const ribbonTop = (containerHeight - pergamenHeight) / 2 - top.height / 2 + 10

  const ease = 'power1.inOut'
  const animationDuration = 1
  tl.addLabel('start')
    .fromTo(
      pergamen,
      {
        height: 60,
      },
      {
        height: pergamenHeight,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      top,
      {
        top: topTop,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      bottom,
      {
        top: bottomtop,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      ribbon,
      {
        top: ribbonTop,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .to(
      `.${pergamenClasses.content}`,
      {
        height: pergamenHeight,
        ease,
        duration: animationDuration,
      },
      'start',
    )
    .addLabel('end')
    .set([bottom, top, ribbon, pergamen], { transition: 'top 0.5s ease-in' }, 'end')
    .then(() => {
      callback()
      gsap.set(pergamen, { clearProps: 'height' })
      gsap.set(pergamen, { clearProps: 'min-height' })
    })
}

export const onHover = (ribbon: HTMLImageElement) => {
  gsap.to(ribbon, {
    rotateX: 25,
    duration: 0.5,
    ease: 'linear',
  })
}

export const onMouseLeave = (ribbon: HTMLImageElement) => {
  gsap.to(ribbon, {
    rotateX: 0,
    duration: 0.5,
    ease: 'linear',
  })
}

export const setClosedPosition = (input: RollAnimationInput) => {
  const { pergamen, top, bottom, ribbon } = input
  const pergamenHeight = pergamen.height
  const topPosition = getOpenedPergamenTopPosition(pergamen, top)
  const bottomPosition = getOpenedPergamenBottomPosition(pergamen, bottom)

  const tl = gsap.timeline()
  tl.set(top, {
    top: topPosition - top.height / 4 + pergamenHeight / 2,
  })
    .set(bottom, {
      top: bottomPosition + bottom.height / 4 - pergamenHeight / 2,
    })
    .set(ribbon, {
      top: topPosition - top.height / 4 + 10 + pergamenHeight / 2,
    })
    .set(`.${pergamenClasses.content}`, { height: 0 })
    .set(pergamen, {
      height: 0,
      minHeight: 20,
    })
}

export const setOpenPosition = (input: RollAnimationInput) => {
  const { pergamen, top, bottom, ribbon } = input

  const containerHeight = pergamen.parentElement?.clientHeight || 0
  const pergamenHeight = containerHeight * 0.6

  const topTop = (containerHeight - pergamenHeight) / 2 - top.height / 2
  const bottomtop = (containerHeight - pergamenHeight) / 2 + pergamenHeight - bottom.height / 2
  const ribbonTop = (containerHeight - pergamenHeight) / 2 - top.height / 2 + 10

  const tl = gsap.timeline()
  tl.set(pergamen, {
    height: pergamenHeight,
  })
    .set(top, {
      top: topTop,
    })
    .set(bottom, {
      top: bottomtop,
    })
    .set(ribbon, {
      top: ribbonTop,
    })
    .set(`.${pergamenClasses.content}`, {
      height: pergamenHeight,
    })
    .then(() => {
      gsap.set([pergamen, top, bottom, ribbon, `.${pergamenClasses.content}`], { clearProps: 'inset' })
      gsap.set(pergamen, { clearProps: 'height' })
    })
}

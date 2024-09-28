'use client'

import gsap from 'gsap'
import throttle from 'lodash.throttle'
import { useEffect, useRef, useState } from 'react'

import { onHover, onMouseLeave, rollScroll, setClosedPosition, setOpenPosition, unRollScroll } from './animation'
import { RESIZE_TRIGGER } from './constants'
import {
  getOpenedPergamenBottomPosition,
  getOpenedPergamenTopPosition,
  getOpenedRibbonTopPosition,
  getTopBottomPergamenWith,
} from './utils'

export const usePergamen = (
  rolled: boolean,
  defaultPosition?: 'rolled' | 'unrolled' | undefined,
  onInitialization?: (() => void) | undefined,
  onAnimationStateChange?: (rolled: boolean) => void,
  allowAdjustment?: boolean | undefined,
) => {
  const pergamen = useRef<HTMLImageElement>(null)
  const top = useRef<HTMLImageElement>(null)
  const bottom = useRef<HTMLImageElement>(null)
  const ribbon = useRef<HTMLImageElement>(null)
  const content = useRef<HTMLDivElement>(null)

  const [initialized, setInitialized] = useState<boolean>(false)
  const [topPosition, setTopPosition] = useState<number>(0)
  const [bottomPosition, setBottomPosition] = useState<number>(0)
  const [ribbonPosition, setRibbonPosition] = useState<number>(0)
  const [contentHeight, setContentHeight] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)

  const adjustPergamen = throttle(() => {
    if (pergamen.current && top.current && bottom.current && content.current && allowAdjustment) {
      const deps = [pergamen.current, top.current, bottom.current, ribbon.current]
      gsap.set(deps, { clearProps: 'inset' })
      gsap.set(deps, { clearProps: 'transition' })
      gsap.set([top.current, ribbon.current, bottom.current], { clearProps: 'top' })
      gsap.set(content.current, { clearProps: 'height' })
      setTopPosition(getOpenedPergamenTopPosition(pergamen.current, top.current))
      setRibbonPosition(getOpenedRibbonTopPosition(pergamen.current, top.current))
      setWidth(getTopBottomPergamenWith(pergamen.current))
      setBottomPosition(getOpenedPergamenBottomPosition(pergamen.current, bottom.current))
      setContentHeight(pergamen.current.height)
    }
  }, 50)

  // CLEAR INLINE STYLES
  useEffect(() => {
    pergamen.current?.style.removeProperty('height')
    top.current?.style.removeProperty('top')
    ribbon.current?.style.removeProperty('top')
    ribbon.current?.style.removeProperty('left')
    ribbon.current?.style.removeProperty('width')
    bottom.current?.style.removeProperty('top')
  }, [bottom, top, pergamen, ribbon])

  // ADD LISTENERS
  useEffect(() => {
    const canCall = Boolean(pergamen.current && top.current && bottom.current)

    if (canCall) {
      adjustPergamen()
      window.addEventListener(RESIZE_TRIGGER, adjustPergamen)
      window.addEventListener('resize', adjustPergamen)
    }

    return () => {
      window.removeEventListener(RESIZE_TRIGGER, adjustPergamen)
      window.removeEventListener('resize', adjustPergamen)
    }
  }, [adjustPergamen])

  // HANDLE ADJUSTMENT PROPERTY CHANGES
  useEffect(() => {
    if (ribbon.current && !allowAdjustment) {
      gsap.set(ribbon.current, { width: ribbon.current.width })
      return
    }
    if (ribbon.current && allowAdjustment) {
      gsap.set(ribbon.current, { clearProps: 'width' })
    }
  }, [allowAdjustment])

  // ROLL/UNROLL ANIMATION HANDLING
  useEffect(() => {
    if (pergamen.current && top.current && bottom.current && ribbon.current && initialized) {
      const input = { pergamen: pergamen.current, top: top.current, bottom: bottom.current, ribbon: ribbon.current }
      if (rolled) {
        rollScroll(input, () => onAnimationStateChange?.(true))
        return
      }
      unRollScroll(input, () => {
        onAnimationStateChange?.(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolled, pergamen, top, bottom, ribbon])

  // HANDLE DEFAULT PERGAMEN STATE
  useEffect(() => {
    if (pergamen.current && top.current && bottom.current && ribbon.current) {
      const input = { pergamen: pergamen.current, top: top.current, bottom: bottom.current, ribbon: ribbon.current }
      if (defaultPosition === 'rolled') {
        setClosedPosition(input)
      }
      if (defaultPosition === 'unrolled') {
        setOpenPosition(input)
      }
      setInitialized(true)
      onInitialization?.()
    }
  }, [defaultPosition, pergamen, top, bottom, ribbon, onInitialization])

  // HANDLERS
  const mouseEnterHandler = () => {
    if (ribbon.current && !rolled) {
      onHover(ribbon.current)
    }
  }

  const mouseLeaveHandler = () => {
    if (ribbon.current && !rolled) {
      onMouseLeave(ribbon.current)
    }
  }

  return {
    top,
    pergamen,
    bottom,
    topPosition,
    bottomPosition,
    width,
    ribbonPosition,
    ribbon,
    contentHeight,
    content,
    mouseEnterHandler,
    mouseLeaveHandler,
  }
}

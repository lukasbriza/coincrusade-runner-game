'use client'

import { RESIZE_TRIGGER } from '@/shared/components'

export const trigerPergamenAdjustment = () => {
  window.dispatchEvent(new Event(RESIZE_TRIGGER))
}

export const scrollToTop = () => {
  window.scrollTo(0, 0)
}

export const disableScroll = () => {
  scrollToTop()
  window.addEventListener('scroll', scrollToTop)
}

export const enableScroll = () => {
  window.removeEventListener('scroll', scrollToTop)
}

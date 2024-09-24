'use client'

import { useTheme } from '@lukasbriza/theme'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'

import { menuIconClasses } from './classes'

export const useMenuIcon = (
  active?: boolean | undefined,
  height?: number | undefined,
  onClick?: ((active: boolean) => void) | undefined,
) => {
  const [isActive, setIsActive] = useState<boolean>(false)
  const theme = useTheme()

  useEffect(() => {
    if (isActive) {
      const tlA1 = gsap.timeline()
      const tlA3 = gsap.timeline()

      const translate = {
        translateY: (height || theme.size.size6) / 2 - theme.size.size1 / 2,
        duration: 0.5,
        ease: 'power2.in',
      }

      gsap.to(`.${menuIconClasses.a2}`, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      tlA1.to(`.${menuIconClasses.a1}`, { ...translate }).to(`.${menuIconClasses.a1}`, {
        rotate: '-45deg',
        duration: 0.3,
        ease: 'power2.in',
      })
      tlA3.to(`.${menuIconClasses.a3}`, { ...translate }).to(`.${menuIconClasses.a3}`, {
        rotate: '45deg',
        duration: 0.3,
        ease: 'power2.in',
      })
      return
    }

    const tlA1 = gsap.timeline()
    const tlA3 = gsap.timeline()

    gsap.to(`.${menuIconClasses.a2}`, {
      opacity: 1,
      delay: 0.3,
      duration: 0.2,
      ease: 'power2.in',
    })
    tlA1
      .to(`.${menuIconClasses.a1}`, {
        rotate: '0deg',
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(`.${menuIconClasses.a1}`, { translateY: 0, duration: 0.5, ease: 'power2.in' })
    tlA3
      .to(`.${menuIconClasses.a3}`, {
        rotate: '0deg',
        duration: 0.3,
        ease: 'power2.in',
      })
      .to(`.${menuIconClasses.a3}`, {
        translateY: (height || theme.size.size6) - theme.size.size1,
        duration: 0.5,
        ease: 'power2.in',
      })
  }, [isActive, height, theme.size.size1, theme.size.size6])

  useEffect(() => {
    if (active !== undefined) {
      setIsActive(active)
    }
  }, [active])

  const isActiveHandler = () => {
    setIsActive((value) => !value)
    onClick?.(isActive)
  }

  return { isActive, isActiveHandler }
}

/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */

'use client'

import gsap from 'gsap'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import { KeyboardBase } from './base'
import type { AnimationWrapperProps } from './types'

export const AnimationWrapper: FC<AnimationWrapperProps> = ({ className, ...restProps }) => {
  const [activeProps, setActiveProps] = useState<Partial<Record<keyof typeof restProps, boolean>>>({})

  const setObject = (state: boolean) => {
    const keys = Object.keys(restProps) as unknown as (keyof typeof restProps)[]
    let object: Partial<Record<keyof typeof restProps, boolean>> = {}
    for (const key of keys) {
      if (restProps[key] === true) {
        object[key] = state
      }
    }
    setActiveProps(object)
  }

  useEffect(() => {
    const keys = Object.keys(restProps) as unknown as (keyof typeof restProps)[]
    let initObject: Partial<Record<keyof typeof restProps, boolean>> = {}

    for (const key of keys) {
      let property: boolean | undefined = restProps[key]

      if (property === true) {
        initObject[key] = property
      }
    }

    setActiveProps(initObject)

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })
    tl.call(
      () => {
        setObject(true)
      },
      undefined,
      0,
    ).call(
      () => {
        setObject(false)
      },
      undefined,
      1.5,
    )

    return () => {
      tl.clear()
    }
  }, [])

  return <KeyboardBase className={className} {...(activeProps as Record<keyof typeof restProps, boolean>)} />
}

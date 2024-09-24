'use client'

import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'

export const useAperture = (stage?: 1 | 2 | 3 | undefined, initialStage?: 1 | 2 | 3 | undefined) => {
  const top = useRef<HTMLDivElement>(null)
  const down = useRef<HTMLDivElement>(null)
  const initialised = useRef<boolean>(false)

  const common = useMemo(
    () => ({
      duration: 1.5,
      ease: 'power1.in',
    }),
    [],
  )
  const stageOne = useMemo(
    () => ({
      height: '60vh',
      ...common,
    }),
    [common],
  )

  const stageTwo = useMemo(
    () => ({
      height: '35vh',
      ...common,
    }),
    [common],
  )

  const stageThree = useMemo(
    () => ({
      height: '0vh',
      ...common,
    }),
    [common],
  )

  useEffect(() => {
    if (initialStage) {
      switch (initialStage) {
        case 1: {
          gsap.set([top.current, down.current], { height: stageOne.height })
          break
        }
        case 2: {
          gsap.set([top.current, down.current], { height: stageTwo.height })
          break
        }
        case 3: {
          gsap.set([top.current, down.current], { height: stageThree.height })
          break
        }
      }
    }
    initialised.current = true
  }, [initialStage, stageOne.height, stageThree.height, stageTwo.height])

  useEffect(() => {
    if (initialised.current && stage) {
      switch (stage) {
        case 1: {
          gsap.to([top.current, down.current], stageOne)
          break
        }
        case 2: {
          gsap.to([top.current, down.current], stageTwo)
          break
        }
        case 3: {
          gsap.to([top.current, down.current], stageThree)
          break
        }
      }
    }
  }, [stage, stageOne, stageThree, stageTwo])

  return { top, down }
}

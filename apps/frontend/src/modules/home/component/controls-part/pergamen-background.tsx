'use client'

import { useBreakpointContext } from '@lukasbriza/components'
import throttle from 'lodash.throttle'
import { useEffect, useRef, useState, type FC } from 'react'

import { CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT } from '@/shared'

import {
  Content,
  ContentVertical,
  PergamenBackgroundRoot,
  PergamenBackgroundVerticalRoot,
  PergamenBottom,
  PergamenLeftSide,
  PergamenMain,
  PergamenMainVerical,
  PergamenRightSide,
  PergamenTop,
} from './styles'
import type { PergamenBackgroundProps } from './types'

export const PergamenBackground: FC<PergamenBackgroundProps> = ({ className, children }) => {
  const { value } = useBreakpointContext()
  const leftSide = useRef<HTMLImageElement>(null)
  const rightSide = useRef<HTMLImageElement>(null)
  const topSide = useRef<HTMLImageElement>(null)
  const bottomSide = useRef<HTMLImageElement>(null)

  const [left, setLeft] = useState<number>(0)
  const [right, setRight] = useState<number>(0)
  const [top, setTop] = useState<number>(0)
  const [bottom, setBottom] = useState<number>(0)

  const handleResize = throttle(() => {
    if (leftSide.current && rightSide.current) {
      setLeft(leftSide.current.width)
      setRight(rightSide.current.width)
    }
    if (topSide.current && bottomSide.current) {
      setTop(topSide.current.height)
      setBottom(bottomSide.current.height)
    }
  }, 50)

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftSide, rightSide, bottomSide, topSide])

  if (!value) {
    return null
  }

  return (
    <>
      <PergamenBackgroundVerticalRoot
        className={className}
        ownerState={{ visible: value <= CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT, offset: top + bottom }}
      >
        <PergamenMainVerical
          alt="scroll main part"
          fill
          loading="lazy"
          ownerState={{ offset: top / 2 + bottom / 2 }}
          sizes="(max-width: 779px) 80vw, 100vw"
          src="/paper.png"
        />
        <ContentVertical ownerState={{ topOffset: top, bottomOffset: bottom }}>{children}</ContentVertical>
        <PergamenTop ref={topSide} alt="scroll top part" fill loading="lazy" src="/upper.png" />
        <PergamenBottom ref={bottomSide} alt="scroll bottom part" fill loading="lazy" src="/lower.png" />
      </PergamenBackgroundVerticalRoot>

      <PergamenBackgroundRoot
        className={className}
        ownerState={{ visible: value > CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT }}
      >
        <PergamenMain
          alt="scroll main part"
          fill
          loading="lazy"
          ownerState={{ leftOffset: left, rightOffset: right }}
          sizes="(max-width: 1750px) calc(100% - 180px), 1220px"
          src="/paper-h.png"
        />
        <Content ownerState={{ leftOffset: left, rightOffset: right }}>{children}</Content>
        <PergamenLeftSide
          ref={leftSide}
          alt="scroll side part"
          fill
          loading="lazy"
          sizes="100px"
          src="/upper-l-h.png"
        />
        <PergamenRightSide
          ref={rightSide}
          alt="scroll side part"
          fill
          loading="lazy"
          sizes="100px"
          src="/upper-r-h.png"
        />
      </PergamenBackgroundRoot>
    </>
  )
}

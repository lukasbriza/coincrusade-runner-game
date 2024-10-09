'use client'

import Image from 'next/image'
import { forwardRef } from 'react'

import { pergamenClasses } from './classes'
import { Content, Root } from './styles'
import type { PergamenProps } from './types'
import { usePergamen } from './use-pergamen'

export const Pergamen = forwardRef<HTMLDivElement, PergamenProps>(
  (
    {
      rolled = false,
      children,
      defaultPosition,
      className,
      allowAdjustment = true,
      onInitialization,
      onAnimationStateChange,
      closePergamen,
      onClick,
    },
    ref,
  ) => {
    const {
      top,
      pergamen,
      bottom,
      topPosition,
      bottomPosition,
      width,
      ribbonPosition,
      ribbon,
      content,
      contentHeight,
      mouseEnterHandler,
      mouseLeaveHandler,
    } = usePergamen(rolled, defaultPosition, onInitialization, onAnimationStateChange, allowAdjustment)

    return (
      <Root
        ref={ref}
        className={className}
        ownerState={{ width, topTop: topPosition, ribbonTop: ribbonPosition, bottomTop: bottomPosition }}
        onClick={onClick}
      >
        <Image ref={pergamen} alt="pergamen" className={pergamenClasses.body} fill src="/paper.png" />
        <Image ref={top} alt="pergamen top" className={pergamenClasses.top} fill src="/upper.png" />
        <Image ref={bottom} alt="pergamen bottom" className={pergamenClasses.bottom} fill src="/lower.png" />
        <Content
          ref={content}
          className={pergamenClasses.content}
          ownerState={{
            paddingBottom: (top.current?.height || 0) / 2,
            paddingTop: bottom.current?.height,
            height: contentHeight,
          }}
        >
          {children}
        </Content>
        <Image
          ref={ribbon}
          alt="pergamen ribbon"
          className={pergamenClasses.ribbon}
          fill
          src="/ribbon.png"
          onClick={closePergamen}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        />
      </Root>
    )
  },
)

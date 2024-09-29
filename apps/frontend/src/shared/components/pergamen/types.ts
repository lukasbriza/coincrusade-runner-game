import type { MouseEventHandler, ReactNode } from 'react'

export type PergamenProps = {
  className?: string | undefined
  rolled?: boolean
  children: ReactNode
  defaultPosition?: 'rolled' | 'unrolled' | undefined
  allowAdjustment?: boolean | undefined
  onInitialization?: (() => void) | undefined
  onAnimationStateChange?: ((rolled: boolean) => void) | undefined
  closePergamen?: (() => void) | undefined
  onClick?: MouseEventHandler | undefined
}

export type RollAnimationInput = {
  pergamen: HTMLImageElement
  top: HTMLImageElement
  bottom: HTMLImageElement
  ribbon: HTMLImageElement
}

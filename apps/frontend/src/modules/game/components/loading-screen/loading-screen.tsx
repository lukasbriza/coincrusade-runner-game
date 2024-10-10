'use client'

import { LoadingBar } from '@lukasbriza/components'
import { useCallback, useEffect, useState, type FC } from 'react'

import { LOAD_ANIMATION_END_EVENT, LOAD_END_EVENT, LOAD_PROGRESS_EVENT, LOAD_START_EVENT } from '../context'

import { loadingScreenClasses } from './classes'
import { LoadingAnimationWrapper, Root, RunAnimation } from './styles'

const DEFAULT_LOADING_TIME = 2000
let timeout: NodeJS.Timeout | undefined

export const LoadingScreen: FC = () => {
  const [minimalTimeElapsed, setMinimalTimeElapsed] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const handleLoadStart = useCallback(() => {
    setShow(true)
    setProgress(0)
  }, [])

  const handleLoadEnd = useCallback(() => {
    setProgress(1)
    if (minimalTimeElapsed) {
      setShow(false)
      dispatchEvent(new Event(LOAD_ANIMATION_END_EVENT))
    }
  }, [minimalTimeElapsed])

  const handleProgress = useCallback((event: Event) => {
    const customEvent = event as CustomEvent<{ progress: number }>
    if (customEvent.detail.progress) {
      setProgress(customEvent.detail.progress)
    }
  }, [])

  useEffect(() => {
    window.addEventListener(LOAD_PROGRESS_EVENT, handleProgress)
    window.addEventListener(LOAD_START_EVENT, handleLoadStart)
    window.addEventListener(LOAD_END_EVENT, handleLoadEnd)

    return () => {
      window.addEventListener(LOAD_START_EVENT, handleLoadStart)
      window.addEventListener(LOAD_END_EVENT, handleLoadEnd)
    }
  }, [handleLoadEnd, handleLoadStart, handleProgress])

  useEffect(() => {
    if (!timeout) {
      timeout = setTimeout(() => {
        setMinimalTimeElapsed(true)
        setShow(false)
        dispatchEvent(new Event(LOAD_ANIMATION_END_EVENT))
      }, DEFAULT_LOADING_TIME)
    }
  }, [])

  if (!show && minimalTimeElapsed) {
    return null
  }

  return (
    <Root>
      <LoadingAnimationWrapper>
        <RunAnimation alt="run animation" height={128} src="/run.gif" width={128} />
        <LoadingBar className={loadingScreenClasses.loadingBar} maxProgressValue={1} progress={progress} />
      </LoadingAnimationWrapper>
    </Root>
  )
}

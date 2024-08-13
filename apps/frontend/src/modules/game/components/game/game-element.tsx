import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { useGamecontext } from '../context'

const GameElement: FC = () => {
  const { setGameContainer } = useGamecontext()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      setGameContainer(ref.current)
    }
  }, [ref, setGameContainer])

  return <div ref={ref} id="game-container" />
}

export default GameElement

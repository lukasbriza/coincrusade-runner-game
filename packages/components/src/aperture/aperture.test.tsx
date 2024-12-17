import { act, cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { Aperture } from './aperture'

afterEach(() => {
  cleanup()
})

describe('Aperture', () => {
  test('Should render', () => {
    const result = render(<Aperture>children</Aperture>)

    expect(result.getByTestId('aperture1')).toBeDefined()
    expect(result.getByTestId('aperture2')).toBeDefined()
  })

  test('Should have className', () => {
    const result = render(<Aperture className="class">children</Aperture>)

    expect(result.container.querySelectorAll('.class')).toHaveLength(2)
  })

  test('Should move aperture on different stages', async () => {
    const closed = render(
      <Aperture className="closed" initialStage={1}>
        children
      </Aperture>,
    )
    const opened = render(
      <Aperture className="opened" initialStage={3}>
        children
      </Aperture>,
    )

    const center = render(
      <Aperture className="center" initialStage={2}>
        children
      </Aperture>,
    )

    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(() => resolve(null), 2000)
      })
    })

    for (const element of closed.container.querySelectorAll('.closed')) {
      const styles = element.getAttribute('style')
      expect(styles).includes('height: 60vh;')
    }

    for (const element of opened.container.querySelectorAll('.opened')) {
      const styles = element.getAttribute('style')
      expect(styles).includes('height: 0vh;')
    }

    for (const element of center.container.querySelectorAll('.center')) {
      const styles = element.getAttribute('style')
      expect(styles).includes('height: 30vh;')
    }
  })

  test(
    'Should have correct height on stage change',
    async () => {
      const { getByTestId, rerender } = render(<Aperture stage={1}>children</Aperture>)

      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(() => resolve(null), 2000)
        })
      })

      expect(getByTestId('aperture1').getAttribute('style')).includes('height: 60vh;')
      expect(getByTestId('aperture2').getAttribute('style')).includes('height: 60vh;')

      rerender(<Aperture stage={2}>children</Aperture>)

      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(() => resolve(null), 2000)
        })
      })

      expect(getByTestId('aperture1').getAttribute('style')).includes('height: 30vh;')
      expect(getByTestId('aperture2').getAttribute('style')).includes('height: 30vh;')

      rerender(<Aperture stage={3}>children</Aperture>)

      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(() => resolve(null), 2000)
        })
      })

      expect(getByTestId('aperture1').getAttribute('style')).includes('height: 0vh;')
      expect(getByTestId('aperture2').getAttribute('style')).includes('height: 0vh;')
    },
    { timeout: 20_000 },
  )
})

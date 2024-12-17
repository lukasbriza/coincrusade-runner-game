import { cleanup, render, act } from '@testing-library/react'
import { describe, afterEach, test, expect, vi } from 'vitest'

import { wait } from '../test'

import { Snackbar } from './snackbar'

afterEach(() => {
  cleanup()
})

describe('Snackbar', () => {
  test('Should render', () => {
    const result = render(<Snackbar id="id">children</Snackbar>)

    expect(result.getByTestId('snackbar')).toBeDefined()
  })

  test('Should close snackbar on cross click', async () => {
    const result = render(<Snackbar id="id">children</Snackbar>)

    act(() => {
      result.getByTestId('closeicon').dispatchEvent(new Event('click'))
    })

    await wait(1000)

    expect(result.container.children.item(0)?.getAttribute('style')).toBe('opacity: 1;')
  })
  test('Should close on aoutoHideDuration exceed', async () => {
    const result = render(
      <Snackbar autoHideDuration={500} id="id">
        children
      </Snackbar>,
    )

    await wait(2000)

    expect(result.container.children.length).toBe(0)
  })

  test('Should call onclose function', async () => {
    const callback = vi.fn(() => null)
    render(
      <Snackbar autoHideDuration={100} id="id" onClose={callback}>
        children
      </Snackbar>,
    )

    await wait(2000)

    expect(callback.mock.calls.length).toBe(1)
  })
})

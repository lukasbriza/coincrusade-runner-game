import { cleanup, render, act } from '@testing-library/react'
import { describe, afterEach, test, expect, vi } from 'vitest'

import { Modal } from './modal'

afterEach(() => {
  cleanup()
})

describe('Modal', () => {
  test('Should render', () => {
    const result = render(
      <Modal open>
        <div>children</div>
      </Modal>,
    )

    expect(result.getByTestId('modal')).toBeDefined()
  })

  test('Should be closed', () => {
    const result = render(
      <Modal open={false}>
        <div>children</div>
      </Modal>,
    )

    expect(result.container.children.length).toBe(0)
  })

  test('Should have className', () => {
    const result = render(
      <Modal className="className" open>
        <div>children</div>
      </Modal>,
    )

    expect(result.container.querySelectorAll('.className')[0]).toBeDefined()
  })

  test('Should fire onClose backdrop', () => {
    const callback = vi.fn(() => null)
    const result = render(
      <Modal open onClose={callback}>
        <div>children</div>
      </Modal>,
    )
    act(() => {
      result.getByTestId('modal').click()
    })

    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0].at(-1)).toBe('backdropClick')
  })
})

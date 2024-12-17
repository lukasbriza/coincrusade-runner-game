import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { WithTheme } from '../test'

import { Menu } from './menu'

afterEach(() => {
  cleanup()
})

describe('Menu', () => {
  test('Should render', () => {
    const result = render(<Menu items={[{ path: '/', name: 'test', active: false }]} />, { wrapper: WithTheme })
    expect(result.getByTestId('menu')).toBeDefined()
  })

  test('Should render items', () => {
    const result = render(<Menu items={[{ path: '/', name: 'test', active: false }]} />, { wrapper: WithTheme })
    expect(result.getByTestId('menuitemswrapper').children.length).toBe(1)
  })

  test('Should render icons', () => {
    const result = render(
      <Menu iconSection={[<div key="key" />]} items={[{ path: '/', name: 'test', active: false }]} />,
      { wrapper: WithTheme },
    )
    expect(result.getByTestId('iconmenusection').children.length).toBe(1)
  })

  test('Should propagate itemClassName', () => {
    const result = render(<Menu itemClassName="itemClassName" items={[{ path: '/', name: 'test', active: false }]} />, {
      wrapper: WithTheme,
    })
    expect(result.getByTestId('menuitemswrapper').querySelectorAll('.itemClassName').length).toBe(1)
  })
})

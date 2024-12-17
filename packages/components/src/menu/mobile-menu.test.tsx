import { render, act, cleanup } from '@testing-library/react'
import { describe, afterEach, test, expect, vi } from 'vitest'

import { wait, WithTheme } from '../test'

import { MobileMenu } from './mobile-menu'

afterEach(() => {
  cleanup()
})

describe('MobileMenu', () => {
  test('Should render', () => {
    const result = render(<MobileMenu items={[{ name: 'test', path: '/', active: false }]} />, { wrapper: WithTheme })
    expect(result.getByTestId('menuicon')).toBeDefined()
    expect(result.getByTestId('menumodal')).toBeDefined()
  })

  test('Should open', async () => {
    const result = render(<MobileMenu items={[{ name: 'test', path: '/', active: false }]} />, { wrapper: WithTheme })

    act(() => {
      result.getByTestId('menuicon').click()
    })

    await wait(50)

    expect(result.getByTestId('menumodal')).toBeDefined()
  })

  test('Should render menu items', () => {
    const result = render(<MobileMenu items={[{ name: 'test', path: '/', active: false }]} />, { wrapper: WithTheme })
    expect(result.getAllByTestId('menuitem').length).toBe(1)
  })

  test('Should render icon section', () => {
    const result = render(
      <MobileMenu
        iconSection={[<div key="key" className="icon" />]}
        items={[{ name: 'test', path: '/', active: false }]}
      />,
      { wrapper: WithTheme },
    )

    expect(result.container.querySelectorAll('.icon').length).toBe(1)
  })

  test('Should callback on item click', () => {
    const callback = vi.fn(() => null)
    const result = render(<MobileMenu items={[{ name: 'test', path: '/', active: false }]} onItemClick={callback} />, {
      wrapper: WithTheme,
    })

    act(() => {
      result.getAllByTestId('text')[0].click()
    })

    expect(callback.mock.calls.length).toBe(1)
  })

  test('Should propagate mobileMenuIconClassName', () => {
    const result = render(
      <MobileMenu
        items={[{ name: 'test', path: '/', active: false }]}
        mobileMenuIconClassName="mobileMenuIconClassName"
      />,
      { wrapper: WithTheme },
    )

    expect(result.container.querySelectorAll('.mobileMenuIconClassName')[0]).toBeDefined()
  })

  test('Should propagate mobileMenuRootClass', async () => {
    const result = render(
      <MobileMenu items={[{ name: 'test', path: '/', active: false }]} mobileMenuRootClass="mobileMenuRootClass" />,
      { wrapper: WithTheme },
    )

    act(() => {
      result.getByTestId('menuicon').click()
    })

    await wait(50)

    expect(result.container.querySelectorAll('.mobileMenuRootClass')[0]).toBeDefined()
  })
})

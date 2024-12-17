/* eslint-disable unicorn/prefer-dom-node-append */
import { breakpoints } from '@lukasbriza/theme'
import { act, cleanup, renderHook } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { wait, WithThemeAndBreakpoint } from '../test'

import { useBreakpointContext } from './breakpoint-context'

afterEach(() => {
  cleanup()
})

const resizeWindow = (width: number) => {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'))
}

describe('BreakpointProvider', () => {
  test('Should render', () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })
    expect(result.current).toBeDefined()
  })

  test('Should have window with xs width', async () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })

    act(() => resizeWindow(breakpoints.values.xs))
    await wait(50)

    expect(result.current.value).toBe(breakpoints.values.xs)
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(true)
    expect(result.current.xl).toBe(true)
  })

  test('Should have window with sm width', async () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })

    act(() => resizeWindow(breakpoints.values.sm))
    await wait(50)

    expect(result.current.value).toBe(breakpoints.values.sm)
    expect(result.current.xs).toBe(false)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(true)
    expect(result.current.xl).toBe(true)
  })

  test('Should have window with md width', async () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })

    act(() => resizeWindow(breakpoints.values.md))
    await wait(50)

    expect(result.current.value).toBe(breakpoints.values.md)
    expect(result.current.xs).toBe(false)
    expect(result.current.sm).toBe(false)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(true)
    expect(result.current.xl).toBe(true)
  })

  test('Should have window with lg width', async () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })

    act(() => resizeWindow(breakpoints.values.lg))
    await wait(50)

    expect(result.current.value).toBe(breakpoints.values.lg)
    expect(result.current.xs).toBe(false)
    expect(result.current.sm).toBe(false)
    expect(result.current.md).toBe(false)
    expect(result.current.lg).toBe(true)
    expect(result.current.xl).toBe(true)
  })

  test('Should have window with xl width', async () => {
    const { result } = renderHook(() => useBreakpointContext(), { wrapper: WithThemeAndBreakpoint })

    act(() => resizeWindow(breakpoints.values.xl))
    await wait(50)

    expect(result.current.value).toBe(breakpoints.values.xl)
    expect(result.current.xs).toBe(false)
    expect(result.current.sm).toBe(false)
    expect(result.current.md).toBe(false)
    expect(result.current.lg).toBe(false)
    expect(result.current.xl).toBe(true)
  })
})

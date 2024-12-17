import { describe, test, expect } from 'vitest'

import { isNil } from './is-nil'

describe('isNil', () => {
  test('Should return true', () => {
    const resolved = isNil(null)
    expect(resolved).toBe(true)
  })

  test('Should return false', () => {
    const resolved1 = isNil('test')
    const resolved2 = isNil(22)
    const resolved3 = isNil(false)
    const resolved4 = isNil({ test: 'test' })

    expect(resolved1).toBe(false)
    expect(resolved2).toBe(false)
    expect(resolved3).toBe(false)
    expect(resolved4).toBe(false)
  })
})

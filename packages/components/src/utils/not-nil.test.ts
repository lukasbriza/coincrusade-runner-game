import { describe, test, expect } from 'vitest'

import { notNil } from './not-nil'

describe('notNil', () => {
  test('Should return false', () => {
    const resolved = notNil(null)
    expect(resolved).toBe(false)
  })

  test('Should return true', () => {
    const resolved1 = notNil('test')
    const resolved2 = notNil(22)
    const resolved3 = notNil(false)
    const resolved4 = notNil({ test: 'test' })

    expect(resolved1).toBe(true)
    expect(resolved2).toBe(true)
    expect(resolved3).toBe(true)
    expect(resolved4).toBe(true)
  })
})

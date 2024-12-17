import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { HeroText } from './hero-text'

afterEach(() => {
  cleanup()
})

describe('Herotext', () => {
  test('Should render', () => {
    const result = render(<HeroText main="main" subtitle="subtitle" />)

    expect(result.getByTestId('herotext')).toBeDefined()
  })

  test('Should render main and subtitle', () => {
    const result = render(<HeroText main="main" subtitle="subtitle" />)

    expect(result.getByText('main')).toBeDefined()
    expect(result.getByText('subtitle')).toBeDefined()
  })
})

import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { MenuItem } from './menu-item'

afterEach(() => {
  cleanup()
})

describe('MenuItem', () => {
  test('Should render', () => {
    const result = render(<MenuItem text="menuitem" />)

    expect(result.getByTestId('menuitem')).toBeDefined()
  })
})

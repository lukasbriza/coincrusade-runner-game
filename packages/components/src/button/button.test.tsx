import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, test, expect } from 'vitest'

import { Button } from './button'

afterEach(() => {
  cleanup()
})

describe('Button', () => {
  test('Should render', () => {
    const result = render(<Button text="button" />)

    expect(result.getByTestId('button')).toBeDefined()
  })
})

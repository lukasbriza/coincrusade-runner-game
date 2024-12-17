import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { NumberInput } from './number-input'

afterEach(() => {
  cleanup()
})

describe('NumberInput', () => {
  test('Should render', () => {
    const result = render(<NumberInput error={false} label="label" name="name" value={1} />)

    expect(result.getByTestId('stringinput')).toBeDefined()
  })
})

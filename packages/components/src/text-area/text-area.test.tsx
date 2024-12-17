import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { TextArea } from './text-area'

afterEach(() => {
  cleanup()
})

describe('TextArea', () => {
  test('Should render', () => {
    const result = render(<TextArea error={false} label="label" name="name" value="value" />)

    expect(result.getByTestId('textarea')).toBeDefined()
  })

  test('Should show label', () => {
    const result = render(<TextArea error={false} label="label" name="name" value="value" />)

    expect(result.getByText('label')).toBeDefined()
  })

  test('Should show * when required', () => {
    const result = render(<TextArea error={false} label="label" name="name" required value="value" />)

    expect(result.getByText('*')).toBeDefined()
  })

  test('Should show helper', () => {
    const result = render(<TextArea error={false} helper="helper" label="label" name="name" value="value" />)

    expect(result.getByText('helper')).toBeDefined()
  })

  test('Should have error styles', () => {
    const result = render(<TextArea error label="label" name="name" value="value" />)

    expect(result.getByTestId('textarea').children.item(1)?.className).include('base--error')
  })

  test('Should have disabled state', () => {
    const result = render(<TextArea disabled error={false} label="label" name="name" value="value" />)

    expect(result.getByTestId('textarea').children.item(1)?.className).include('base--disabled')
  })
})

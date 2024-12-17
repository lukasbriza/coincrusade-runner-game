import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { StringInput } from './string-input'

afterEach(() => {
  cleanup()
})

describe('StringInput', () => {
  test('Should render', () => {
    const result = render(<StringInput error={false} label="label" name="name" value="value" />)

    expect(result.getByTestId('stringinput')).toBeDefined()
  })

  test('Should have label', () => {
    const result = render(<StringInput error={false} label="label" name="name" value="value" />)
    const label = result.getByTestId('stringinput').querySelectorAll('label')[0].textContent
    expect(label).toBe('label')
  })

  test('Should have value', () => {
    const result = render(<StringInput error={false} label="label" name="name" value="value" />)
    const input = result.getByTestId('stringinput').querySelectorAll('input')[0]
    expect(input.value).toBe('value')
  })

  test('Should have name', () => {
    const result = render(<StringInput error={false} label="label" name="name" value="value" />)
    const input = result.getByTestId('stringinput').querySelectorAll('input')[0]
    expect(input.name).toBe('name')
  })

  test('Should have * when required', () => {
    const result = render(<StringInput error={false} label="label" name="name" required value="value" />)
    const element = result.getAllByText('*')
    expect(element[0].innerHTML).toBe('*')
  })

  test('Should have helper', () => {
    const result = render(<StringInput error={false} helper="helper" label="label" name="name" value="value" />)
    const element = result.getAllByText('helper')[0]
    expect(element).toBeDefined()
  })

  test('Should have error class on error', () => {
    const result = render(<StringInput error label="label" name="name" value="value" />)
    expect(result.getByTestId('stringinput').children.item(1)?.className).includes('base--error')
  })
})

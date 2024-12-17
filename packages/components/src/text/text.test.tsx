import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { Text } from './text'

afterEach(() => {
  cleanup()
})

describe('Text', () => {
  test('Should render', () => {
    const result = render(<Text variant="h1">children</Text>)

    expect(result.getByTestId('text')).toBeDefined()
  })

  test('Should have className', () => {
    const result = render(
      <Text className="className" variant="h1">
        children
      </Text>,
    )

    expect(result.getByTestId('text').className).include('className')
  })

  test('Should have correct variant h1', () => {
    const result = render(
      <Text className="className" variant="h1">
        children
      </Text>,
    )

    expect(result.container.querySelectorAll('h1')).toBeDefined()
  })

  test('Should have correct variant h2', () => {
    const result = render(
      <Text className="className" variant="h2">
        children
      </Text>,
    )

    expect(result.container.querySelectorAll('h2')).toBeDefined()
  })

  test('Should have correct variant h3', () => {
    const result = render(
      <Text className="className" variant="h3">
        children
      </Text>,
    )

    expect(result.container.querySelectorAll('h3')).toBeDefined()
  })

  test('Should have correct variant h4', () => {
    const result = render(
      <Text className="className" variant="h4">
        children
      </Text>,
    )

    expect(result.container.querySelectorAll('h4')).toBeDefined()
  })

  test('Should have correct variant h5', () => {
    const result = render(
      <Text className="className" variant="h5">
        children
      </Text>,
    )

    expect(result.container.querySelectorAll('h5')).toBeDefined()
  })
})

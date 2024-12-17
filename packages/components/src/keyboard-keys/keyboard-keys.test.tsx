import { webTheme } from '@lukasbriza/theme'
import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, expect, test } from 'vitest'

import { DownKey } from './down-key'
import { LeftKey } from './left-key'
import { RightKey } from './right-key'
import { Space } from './space'
import { UpKey } from './up-key'

afterEach(() => {
  cleanup()
})

describe('DownKey', () => {
  test('Should render', () => {
    const result = render(<DownKey />)

    expect(result.getByTestId('downkey')).toBeDefined()
  })

  test('Shour render active fill color', () => {
    const result = render(<DownKey isActive />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf([
        webTheme.palette.state.error.primary,
        webTheme.palette.state.error.secondary,
      ])
    }
  })

  test('Should render fill color when inactive', () => {
    const result = render(<DownKey />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf(['#CCCCCC', webTheme.palette.common.white])
    }
  })
})

describe('LeftKey', () => {
  test('Should render', () => {
    const result = render(<LeftKey />)

    expect(result.getByTestId('leftkey')).toBeDefined()
  })

  test('Shour render active fill color', () => {
    const result = render(<LeftKey isActive />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf([
        webTheme.palette.state.error.primary,
        webTheme.palette.state.error.secondary,
      ])
    }
  })

  test('Should render fill color when inactive', () => {
    const result = render(<LeftKey />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf(['#CCCCCC', webTheme.palette.common.white])
    }
  })
})

describe('RightKey', () => {
  test('Should render', () => {
    const result = render(<RightKey />)

    expect(result.getByTestId('rightkey')).toBeDefined()
  })

  test('Shour render active fill color', () => {
    const result = render(<RightKey isActive />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf([
        webTheme.palette.state.error.primary,
        webTheme.palette.state.error.secondary,
      ])
    }
  })

  test('Should render fill color when inactive', () => {
    const result = render(<RightKey />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf(['#CCCCCC', webTheme.palette.common.white])
    }
  })
})

describe('Space', () => {
  test('Should render', () => {
    const result = render(<Space />)

    expect(result.getByTestId('space')).toBeDefined()
  })

  test('Shour render active fill color', () => {
    const result = render(<Space isActive />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf([
        webTheme.palette.state.error.primary,
        webTheme.palette.state.error.secondary,
      ])
    }
  })

  test('Should render fill color when inactive', () => {
    const result = render(<Space />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf(['#CCCCCC', webTheme.palette.common.white])
    }
  })
})

describe('UpKey', () => {
  test('Should render', () => {
    const result = render(<UpKey />)

    expect(result.getByTestId('upkey')).toBeDefined()
  })

  test('Should render active fill color', () => {
    const result = render(<UpKey isActive />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf([
        webTheme.palette.state.error.primary,
        webTheme.palette.state.error.secondary,
      ])
    }
  })

  test('Should render fill color when inactive', () => {
    const result = render(<UpKey />)

    for (const element of result.container.querySelectorAll('path')) {
      expect(element.getAttribute('fill')).oneOf(['#CCCCCC', webTheme.palette.common.white])
    }
  })
})

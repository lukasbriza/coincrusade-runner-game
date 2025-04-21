import { cleanup, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { WithTheme } from '../test'

import { CloseIcon } from './close-icon'
import { GithubIcon } from './github-icon'
import { MailIcon } from './mail-icon'
import { MenuIcon } from './menu-icon'
import { ScaleIcon } from './scale-icon'
import { TriangleIcon } from './triangle-icon'

afterEach(() => {
  cleanup()
})

describe('CloseIcon', () => {
  test('Should render', () => {
    const result = render(<CloseIcon />)

    expect(result.getByTestId('closeicon')).toBeDefined()
  })
})

describe('GithubIcon', () => {
  test('Should render', () => {
    const result = render(<GithubIcon />)

    expect(result.getByTestId('githubicon')).toBeDefined()
  })
})

describe('MailIcon', () => {
  test('Should render', () => {
    const result = render(<MailIcon />)

    expect(result.getByTestId('mailicon')).toBeDefined()
  })
})

describe('MenuIcon', () => {
  test('Should render', () => {
    const result = render(<MenuIcon />, { wrapper: WithTheme })

    expect(result.getByTestId('menuicon')).toBeDefined()
  })
})

describe('ScaleIcon', () => {
  test('Should render', () => {
    const result = render(<ScaleIcon />, { wrapper: WithTheme })

    expect(result.getByTestId('scaleicon')).toBeDefined()
  })
})

describe('TriangleIcon', () => {
  test('Should render', () => {
    const result = render(<TriangleIcon />)

    expect(result.getByTestId('triangleicon')).toBeDefined()
  })
})

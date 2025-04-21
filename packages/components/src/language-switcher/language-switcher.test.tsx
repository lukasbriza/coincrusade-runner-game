import { cleanup, fireEvent, render } from '@testing-library/react'
import { describe, afterEach, test, expect } from 'vitest'

import { WithTheme } from '../test'

import { LanguageSwitcher } from './language-switcher'

afterEach(() => {
  cleanup()
})

const options = [
  {
    value: 'cz',
    flag: (
      <img
        alt="cz"
        src="/cz-flag.png"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    ),
  },
  {
    value: 'en',
    flag: (
      <img
        alt="en"
        src="/en-flag.png"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    ),
  },
]

describe('LanguageSwitcher', () => {
  test('Should render', () => {
    const result = render(<LanguageSwitcher initialValue="cz" options={options} />, { wrapper: WithTheme })

    expect(result.getByTestId('language-switcher')).toBeDefined()
  })

  test('Should render selected flag', () => {
    const result = render(<LanguageSwitcher initialValue="cz" options={options} />, { wrapper: WithTheme })

    const flag = result.getByTestId('language-switcher-selected').querySelectorAll('img')[0]
    expect(flag.tagName).toBe('IMG')
  })

  test('Shouldswitch selected option', async () => {
    const result = render(<LanguageSwitcher initialValue="cz" options={options} />, { wrapper: WithTheme })

    const dropdownIcon = await result.findByTestId('triangleicon')
    fireEvent.click(dropdownIcon)

    const dropdown = await result.findByTestId('language-switcher-dropdown')
    const enImg = dropdown.querySelectorAll('img')[1]
    fireEvent.click(enImg)

    const selected = result.getByTestId('language-switcher-selected').querySelectorAll('img')[0]
    expect(selected.alt).toBe('en')
  })
})

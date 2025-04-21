'use client'

import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { languageSwitcherClasses } from './classes'
import { Dropdown, DropDownIcon, Option, Root, Selected } from './styles'
import type { LanguageSwitcherOption, LanguageSwitcherProps } from './types'

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ options, initialValue, onSelect }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [selected, setSelected] = useState<LanguageSwitcherOption>(
    options.find(({ value }) => value === initialValue) || options[0],
  )

  const handleOpen = () => {
    setOpened(!opened)
  }

  const handleSelect = useCallback(
    (value: string) => {
      const option = options.find(({ value: optionValue }) => optionValue === value)

      if (option) {
        setSelected(option)
        setOpened(false)
        onSelect?.(option.value)
      }
    },
    [onSelect, options],
  )

  return (
    <Root data-testid="language-switcher">
      <Selected data-testid="language-switcher-selected" onClick={handleOpen}>
        {selected.flag}
      </Selected>
      <DropDownIcon className={opened ? languageSwitcherClasses.opened : ''} onClick={handleOpen} />
      {opened && (
        <Dropdown className={opened ? languageSwitcherClasses.opened : ''} data-testid="language-switcher-dropdown">
          {options?.map((option) => (
            <Option
              key={option.value}
              className={selected.value === option.value ? languageSwitcherClasses.selected : undefined}
              onClick={() => handleSelect(option.value)}
            >
              {option.flag}
            </Option>
          ))}
        </Dropdown>
      )}
    </Root>
  )
}

'use client'

import type { MenuProps, OnItemClickHandler } from '@lukasbriza/components'
import type { FC, ReactNode } from 'react'

import { Page } from '@/layout/styles'

import { useMenuContext } from '../../context'
import { MenuWrapper } from '../menu-wrapper'

import { pageWrapperClasses } from './classes'

const onItemClick: OnItemClickHandler = ({ path }) => {
  // eslint-disable-next-line unicorn/prefer-query-selector
  const element = document.getElementById(`${path}`)
  element?.scrollIntoView({ behavior: 'smooth' })
}

export const PageWrapper: FC<{ children: ReactNode; items: MenuProps['items'] }> = ({ children, items }) => {
  const { hidden } = useMenuContext()

  return (
    <Page ownerState={{ isMenuHidden: hidden }}>
      {children}
      <MenuWrapper itemClassName={pageWrapperClasses.menuItems} items={items} onItemClick={onItemClick} />
    </Page>
  )
}

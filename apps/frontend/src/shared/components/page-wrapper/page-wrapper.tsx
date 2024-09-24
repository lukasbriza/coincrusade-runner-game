'use client'

import type { MenuProps } from '@lukasbriza/components'
import type { FC, ReactNode } from 'react'

import { Page } from '@/layout/styles'

import { useMenuContext } from '../context'
import { MenuWrapper } from '../menu-wrapper'

import { pageWrapperClasses } from './classes'

export const PageWrapper: FC<{ children: ReactNode; items: MenuProps['items'] }> = ({ children, items }) => {
  const { hidden } = useMenuContext()
  return (
    <Page ownerState={{ isMenuHidden: hidden }}>
      <MenuWrapper itemClassName={pageWrapperClasses.menuItems} items={items} />
      {children}
    </Page>
  )
}

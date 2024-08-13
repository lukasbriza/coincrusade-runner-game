import type { AsyncWebLayout } from '@/shared'
import { MenuWrapper } from '@/shared/components'
import { Page } from '@/shared/styles'
import { getMenuItems } from '@/utils/get-menu-items'

import { pagesClasses } from './classes'

export const PagesLayout: AsyncWebLayout = async ({ children }) => {
  const items = await getMenuItems()
  return (
    <Page>
      <MenuWrapper itemClassName={pagesClasses.menuItems} items={items} />
      {children}
    </Page>
  )
}

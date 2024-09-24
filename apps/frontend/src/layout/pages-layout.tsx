import { getTranslations } from 'next-intl/server'

import { anchors, type AsyncWebLayout } from '@/shared'
import { PageWrapper } from '@/shared/components'

export const PagesLayout: AsyncWebLayout = async ({ children }) => {
  const t = await getTranslations('anchors')
  const items = anchors.map((anchor) => ({
    name: t(`${anchor.title}`, { ns: 'routes' }),
    path: anchor.path,
    active: false,
  }))

  return <PageWrapper items={items}>{children}</PageWrapper>
}

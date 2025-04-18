import dynamic from 'next/dynamic'

import { getScopedI18n } from '@/i18n/server'
import { anchors, type AsyncWebLayout } from '@/shared'
import { LocalStorageCleaner, PageWrapper } from '@/shared/components'

const GameInstance = dynamic(
  () => import('../modules/game/components/game/game-instance').then((module) => module.GameInstance),
  {
    ssr: false,
  },
)

export const PagesLayout: AsyncWebLayout = async ({ children }) => {
  const t = await getScopedI18n('anchors')
  const items = anchors.map((anchor) => ({
    name: t(`${anchor.title}`),
    path: anchor.path,
    active: false,
  }))

  return (
    <PageWrapper items={items}>
      <GameInstance />
      <LocalStorageCleaner />
      {children}
    </PageWrapper>
  )
}

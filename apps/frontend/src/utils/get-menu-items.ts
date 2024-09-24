import { getTranslations } from 'next-intl/server'

import type { MenuItem } from '@/shared'
import { anchors } from '@/shared/routes'

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const t = await getTranslations('anchors')
  return anchors.map((anchor) => ({ name: t(`${anchor.title}`, { ns: 'routes' }), path: anchor.path, active: false }))
}

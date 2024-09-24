import { Source } from '@storybook/blocks'

import { useTheme } from '../src/index'

export const ThemeOverview = () => {
  const theme = useTheme()
  return <Source code={JSON.stringify(theme, undefined, 2)} language="json" />
}

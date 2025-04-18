import '../static/fonts/stylesheet.css'

import type { WebTheme } from '@lukasbriza/theme'
import { ThemeProvider, useTheme } from '@lukasbriza/theme'
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Decorator, Preview, ReactRenderer } from '@storybook/react'
import type { PartialStoryFn, StoryContext } from '@storybook/types'
import type { FunctionComponent } from 'react'
import { useEffect } from 'react'

/**
 * Extend window object with theme to be available in browser console
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    theme: WebTheme
  }
}

const RootStory: FunctionComponent<{ context: StoryContext; story: PartialStoryFn<ReactRenderer> }> = ({
  context,
  story: Story,
}) => {
  const theme = useTheme()
  useEffect(() => {
    window.parent.window.theme = theme
  }, [theme])

  return <Story {...context} />
}

const RootDecorator: Decorator = (story, context) => (
  <ThemeProvider>
    <RootStory context={context} story={story} />
  </ThemeProvider>
)

const preview: Preview = {
  decorators: [RootDecorator],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: 'white' }],
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['*', ['Docs', 'Overview', '*']],
      },
    },
  },
}

export default preview

import path from 'node:path'

import type { StorybookConfig } from '@storybook/react-vite'
import type { StoriesEntry } from '@storybook/types'

// ADD SOURCES FOR STORIES FE.: packages/components
const packages = ['packages/components', 'packages/theme', 'packages/icons']

function titlePrefix(workspace: string) {
  const [, name] = workspace.split('/')
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function createEntry(workspace: string): Exclude<StoriesEntry, string> {
  return {
    directory: `../../../${workspace}/stories`,
    files: '**/*.@(mdx|stories.ts|stories.tsx)',
    titlePrefix: titlePrefix(workspace),
  }
}

function getAbsolutePath<T extends string>(value: T) {
  return path.dirname(require.resolve(path.join(value, 'package.json'))) as T
}

function resolveDocgenInclude(workspace: string) {
  return path.resolve(__dirname, `../../../${workspace}/src/**/*.{ts,tsx}`)
}

const config: StorybookConfig = {
  stories: packages.map(createEntry),
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: { strictMode: true },
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: packages.map(resolveDocgenInclude),
      shouldExtractValuesFromUnion: true,
    },
  },
  staticDirs: ['../static'],
}

export default config

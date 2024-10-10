import type { Meta, StoryObj } from '@storybook/react'

import { LoadingBar } from '../../src/index'

const meta = {
  component: LoadingBar,
  title: 'Loading bar',
} satisfies Meta<typeof LoadingBar>

type Story = StoryObj<typeof LoadingBar>

export const Primary: Story = {
  args: {
    progress: 30,
    maxProgressValue: 100,
  },
}

export default meta

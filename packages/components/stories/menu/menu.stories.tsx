import type { Meta, StoryObj } from '@storybook/react'

import { GithubIcon, Menu } from '../../src/index'

const meta = {
  component: Menu,
  title: 'Menu',
} satisfies Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

export const Primary: Story = {
  args: {
    iconSection: [<GithubIcon key="github-icon" />],
    items: [
      { path: '/', name: 'Item1', active: true },
      { path: '/', name: 'Item2', active: false },
    ],
  },
}

export default meta

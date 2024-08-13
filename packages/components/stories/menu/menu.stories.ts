import type { Meta, StoryObj } from '@storybook/react'

import { Menu } from '../../src/index'

const meta = {
  component: Menu,
  title: 'Menu',
} satisfies Meta<typeof Menu>

type Story = StoryObj<typeof Menu>

export const Primary: Story = {
  args: {
    items: [
      { path: '/', name: 'Item1', active: true },
      { path: '/', name: 'Item2', active: false },
    ],
  },
}

export default meta

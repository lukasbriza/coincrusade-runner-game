import type { Meta, StoryObj } from '@storybook/react'

import { MenuItem } from '../../src/index'

const meta = {
  component: MenuItem,
  title: 'Menu item',
} satisfies Meta<typeof MenuItem>

type Story = StoryObj<typeof MenuItem>

export const Primary: Story = {
  args: {
    text: 'Menu item',
    active: true,
  },
}

export default meta

import type { Meta, StoryObj } from '@storybook/react'

import { Space } from '../../src/index'

const meta = {
  component: Space,
  title: 'Keyboard keys/Space',
} satisfies Meta<typeof Space>

type Story = StoryObj<typeof Space>

export const Primary: Story = {
  args: {},
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}

export default meta

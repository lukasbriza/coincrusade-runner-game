import type { Meta, StoryObj } from '@storybook/react'

import { LeftKey } from '../../src/index'

const meta = {
  component: LeftKey,
  title: 'Keyboard keys/LeftKey',
} satisfies Meta<typeof LeftKey>

type Story = StoryObj<typeof LeftKey>

export const Primary: Story = {
  args: {},
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}

export default meta

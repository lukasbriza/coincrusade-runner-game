import type { Meta, StoryObj } from '@storybook/react'

import { RightKey } from '../../src/index'

const meta = {
  component: RightKey,
  title: 'Keyboard keys/RightKey',
} satisfies Meta<typeof RightKey>

type Story = StoryObj<typeof RightKey>

export const Primary: Story = {
  args: {},
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}

export default meta

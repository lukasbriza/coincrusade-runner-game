import type { Meta, StoryObj } from '@storybook/react'

import { DownKey } from '../../src/index'

const meta = {
  component: DownKey,
  title: 'Keyboard keys/DownKey',
} satisfies Meta<typeof DownKey>

type Story = StoryObj<typeof DownKey>

export const Primary: Story = {
  args: {},
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}

export default meta

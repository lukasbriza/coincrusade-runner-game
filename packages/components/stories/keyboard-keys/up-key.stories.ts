import type { Meta, StoryObj } from '@storybook/react'

import { UpKey } from '../../src/index'

const meta = {
  component: UpKey,
  title: 'Keyboard keys/UpKey',
} satisfies Meta<typeof UpKey>

type Story = StoryObj<typeof UpKey>

export const Primary: Story = {
  args: {},
}

export const Active: Story = {
  args: {
    isActive: true,
  },
}

export default meta

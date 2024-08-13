import type { Meta, StoryObj } from '@storybook/react'

import { Sprite } from '../../src/index'

const meta = {
  component: Sprite,
  title: 'Sprite',
} satisfies Meta<typeof Sprite>

type Story = StoryObj<typeof Sprite>

export const Primary: Story = {
  args: {
    width: 67,
    height: 86,
    image: '/knight.png',
    columns: 4,
    rows: 1,
    duration: 1.5,
  },
}

export default meta

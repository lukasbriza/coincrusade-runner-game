import type { Meta, StoryObj } from '@storybook/react'

import { GithubIcon } from '../../src/index'

const meta = {
  component: GithubIcon,
  title: 'Github icon',
} satisfies Meta<typeof GithubIcon>

type Story = StoryObj<typeof GithubIcon>

export const Primary: Story = {
  args: {
    size: 24,
  },
}

export default meta

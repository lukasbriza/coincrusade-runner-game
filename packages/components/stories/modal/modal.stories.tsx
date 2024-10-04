import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '../../src/index'

const meta = {
  component: Modal,
  title: 'Modal',
  render: (args) => (
    <Modal {...args}>
      <div>Some content</div>
    </Modal>
  ),
} satisfies Meta<typeof Modal>

type Story = StoryObj<typeof Modal>

export const Primary: Story = {
  args: {
    open: true,
  },
}

export default meta

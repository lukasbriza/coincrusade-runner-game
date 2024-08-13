import type { Meta, StoryObj } from '@storybook/react'
import type { FC, ReactNode } from 'react'

import { BreakpointProvider, useBreakpointContext } from '../../src/index'

const Provider: FC<{ children: ReactNode }> = ({ children }) => <BreakpointProvider>{children}</BreakpointProvider>
const Subscriber: FC = () => {
  const context = useBreakpointContext()
  return (
    <>
      <div style={{ color: 'black' }}>xs: {String(context.xs)}</div>
      <div style={{ color: 'black' }}>sm: {String(context.sm)}</div>
      <div style={{ color: 'black' }}>md: {String(context.md)}</div>
      <div style={{ color: 'black' }}>lg: {String(context.lg)}</div>
      <div style={{ color: 'black' }}>xl: {String(context.xl)}</div>
      <div style={{ color: 'black' }}>value: {String(context.value)}</div>
    </>
  )
}

const meta = {
  component: BreakpointProvider,
  title: 'BreakpointProvider',
  render: () => (
    <Provider>
      <Subscriber />
    </Provider>
  ),
} satisfies Meta<typeof BreakpointProvider>

type Story = StoryObj<typeof BreakpointProvider>

export const Primary: Story = {
  args: {},
}

export default meta

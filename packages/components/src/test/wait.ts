import { act } from '@testing-library/react'

export const wait = async (time: number) => {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, time)
    })
  })
}

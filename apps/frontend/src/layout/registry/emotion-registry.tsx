'use client'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@lukasbriza/theme'
import { useServerInsertedHTML } from 'next/navigation'
import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'

export const EmotionRegistry: FC<PropsWithChildren> = ({ children }) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true

    const insert = cache.insert.bind(cache)
    let inserted: string[] = []

    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return insert(...args)
    }

    const flush = () => {
      const previousInserted = inserted
      inserted = []
      return previousInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return
    }

    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }

    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: styles }}
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider>{children}</ThemeProvider>
    </CacheProvider>
  )
}

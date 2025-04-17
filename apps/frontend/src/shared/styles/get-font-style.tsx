'server-only'

/* eslint-disable @next/next/no-css-tags, react/no-danger */
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { minify } from 'csso'

const fontsDirectory = '/fonts'
const fontsPath = path.join(fileURLToPath(import.meta.url), '../../../../public', fontsDirectory)

/**
 * Loads normalized and minimized stylesheet definition for all font files.
 */
async function getStylesheet() {
  const stylesheet = await readFile(path.join(fontsPath, 'stylesheet.css'), 'utf8')
  const { css } = minify(stylesheet.replaceAll(/url\('([^']+)'\)/g, `url('${fontsDirectory}/$1')`))
  return css
}

/**
 * Preloads all font files and injects their stylesheet definition.
 */
export async function getFontStyle() {
  const files = await readdir(fontsPath, {
    recursive: false,
    withFileTypes: true,
  })

  return (
    <>
      {files
        .filter((file) => file.isFile() && file.name.endsWith('.otf'))
        .map((file) => {
          const href = path.join(fontsDirectory, file.name)
          return <link key={href} as="font" crossOrigin="anonymous" fetchPriority="high" href={href} rel="preload" />
        })}
      <style dangerouslySetInnerHTML={{ __html: await getStylesheet() }} key="font" />
    </>
  )
}

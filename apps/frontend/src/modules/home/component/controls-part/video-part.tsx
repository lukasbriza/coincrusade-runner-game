'use client'

import 'yet-another-react-lightbox/styles.css'
import { useState, type FC } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'

import { useScopedI18n } from '@/i18n/client'

import { controlsPartClasses } from './classes'
import { Icon, Video as VideoElement, VideoWrapper } from './styles'
import type { VideoPartProps } from './types'

export const VideoPart: FC<VideoPartProps> = ({ section }) => {
  const [open, setOpen] = useState<boolean>(false)
  const t = useScopedI18n('video')

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <VideoWrapper className={controlsPartClasses.video}>
        <Icon onClick={handleClick} />
        <VideoElement autoPlay controls={false} loop muted playsInline>
          <source src={section.videoUrl} type="video/mp4" />
          {t('cantLoad')}
        </VideoElement>
      </VideoWrapper>
      <Lightbox
        close={handleClose}
        open={open}
        plugins={[Video]}
        slides={[{ type: 'video', sources: [{ src: section.videoUrl, type: 'video/mp4' }] }]}
        video={{
          controls: false,
          muted: true,
          loop: true,
          autoPlay: true,
          disablePictureInPicture: true,
          disableRemotePlayback: true,
          preload: 'auto',
        }}
      />
    </>
  )
}

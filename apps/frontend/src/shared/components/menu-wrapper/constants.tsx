import Image from 'next/image'

import { Locale } from '@/i18n/config'

export const languageSwitcherOptions = [
  {
    value: Locale.cs,
    flag: <Image alt="cz" height={20} src="/cz-flag.png" width={30} />,
  },
  {
    value: Locale.en,
    flag: <Image alt="en" height={20} src="/en-flag.png" width={30} />,
  },
]

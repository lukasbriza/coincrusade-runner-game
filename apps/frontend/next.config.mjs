import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./src/i18n/i18n.ts")

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: false,
  transpilePackages:
    process.env.NODE_ENV === 'production'
      ? []
      : [
          //add packages from monorepo
          "@lukasbriza/theme",
          "@lukasbriza/styles",
          "@lukasbriza/components",
        ],
})

export default nextConfig

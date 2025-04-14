/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    serverComponentsExternalPackages: ['next-runtime-env'],
  }
}

export default nextConfig

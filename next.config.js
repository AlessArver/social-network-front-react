/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
    outputStandalone: true,
    allowMiddlewareResponseBody: true
  },
  rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5000/graphql' // Proxy to Backend
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  compiler: {
    emotion: true
  }
}

module.exports = nextConfig

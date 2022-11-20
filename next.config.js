/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:5000/graphql", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  webpack(config, { isServer }) {
    // Disable file tracing to prevent micromatch stack overflow
    if (isServer) {
      config.externals = [];
    }
    return config;
  },
};

module.exports = nextConfig;

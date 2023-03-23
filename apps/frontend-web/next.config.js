const nextBuildId = require('next-build-id')


process.on('unhandledRejection', (reason, promise) => {
  console.log("next config ", reason, promise)
});
process.on('rejectionHandled', (promise) => {
  console.log("next config ", promise)
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  generateBuildId: () => nextBuildId(),
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(nextConfig);

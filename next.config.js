/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['tailwindcss']);

module.exports = withTM({
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

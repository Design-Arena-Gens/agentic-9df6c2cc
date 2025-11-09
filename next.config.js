/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["reactflow", "zustand", "classnames", "mathjs"],
  },
};

module.exports = nextConfig;

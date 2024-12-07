// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["itfestkz04.hb.kz-ast.bizmrg.com", "90.156.251.249"],
  },
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["pages", "components", "lib", "utils", "styles"], // Directories to ignore
  },
  experimental: {
    esmExternals: true, // Enable ESM support
  },
};

export default nextConfig;

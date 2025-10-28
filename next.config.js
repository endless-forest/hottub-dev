/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "picsum.photos",
      "example.com",
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;

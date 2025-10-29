/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // ✅ add this one
      },
      {
        protocol: "https",
        hostname: "example.com", // optional, if you host your own
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "**",
      },
    ],
    domains: [
      "tailwindui.com",
      "images.unsplash.com",
      "api.dicebear.com",
      "localhost",
      "plus.unsplash.com",
      "picsum.photos",
      "mobychatbot.s3.sa-east-1.amazonaws.com",
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

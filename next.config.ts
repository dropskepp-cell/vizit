import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Временные фото товаров — пока нет своего хранилища
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shatranjiran.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "quera.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thumbs.dreamstime.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "elie.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img9.irna.ir",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

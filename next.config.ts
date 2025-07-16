/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb' // Adjust as needed
    }
  }

};

module.exports = nextConfig;

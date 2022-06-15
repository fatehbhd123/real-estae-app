/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bayut-production.s3.eu-central-1.amazonaws.com', 'q4g9y5a8.rocketcdn.me']
  }
}

module.exports = nextConfig

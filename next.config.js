/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'], // Add Google OAuth images domain as well
  },
}

module.exports = nextConfig
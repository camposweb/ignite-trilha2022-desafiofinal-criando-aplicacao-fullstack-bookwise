/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        hostname:
          "grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com",
      },
      { hostname: "objectstorage.sa-saopaulo-1.oraclecloud.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;

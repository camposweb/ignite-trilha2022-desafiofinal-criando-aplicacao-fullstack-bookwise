/* eslint-disable prettier/prettier */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:
          "grjgd93pjxvw.objectstorage.sa-saopaulo-1.oci.customer-oci.com",
      },
      { hostname: "objectstorage.sa-saopaulo-1.oraclecloud.com" },
    ],
  },
};

export default nextConfig;

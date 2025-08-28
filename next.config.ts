import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// next.config.js
const path = require("path");

module.exports = {
  webpack: (config) => {
    // Ignore system folders like Application Data
    config.watchOptions = {
      ignored: [
        "**/node_modules",
        "**/.git",
        "**/Application Data/**",
      ],
    };
    return config;
  },
};


// export default nextConfig;

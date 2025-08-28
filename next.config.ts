// import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // next.config.js
// import path from "path";

// module.exports = {
//   webpack: (config) => {
//     // Ignore system folders like Application Data
//     config.watchOptions = {
//       ignored: [
//         "**/node_modules",
//         "**/.git",
//         "**/Application Data/**",
//       ],
//     };
//     return config;
//   },
// };


// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;

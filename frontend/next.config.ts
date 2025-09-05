import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Fix React Spectrum import issues
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-spectrum/filetrigger': false,
    };

    if (!isServer) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
              plugins: ['relay'],
            },
          },
        ],
      });
    }
    return config;
  },
};

export default nextConfig;

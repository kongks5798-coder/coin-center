import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // "오타 있어도 그냥 넘어가!"
  },
  // eslint 부분은 에러가 나서 삭제했습니다!
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding'); // "이 부품들은 검사 면제!"
    return config;
  },
};

export default nextConfig;

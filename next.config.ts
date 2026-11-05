import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // 로컬 네트워크 IP에서 dev 서버 접근 허용
  allowedDevOrigins: ["192.168.0.54"],
};

export default nextConfig;

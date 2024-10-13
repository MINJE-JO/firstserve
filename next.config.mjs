/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
  serverRuntimeConfig: {
    // 서버 측에서 punycode 사용을 비활성화
    punycode: false,
  },
  images: {
    domains: ['example.com'],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/", headers: [{ key: "Vary", value: "Accept" }] }, { source: "/:file(llms.txt|index.md|agent-instructions.md)", headers: [{ key: "Content-Type", value: "text/markdown; charset=utf-8" }] }];
  },
  async redirects() {
    return [
      {
        source: "/gallery",
        destination: "https://golandmarktx.com/#work",
        permanent: true,
      },
      {
        source: "/outdoor-lighting",
        destination: "https://golandmarktx.com/landscape-lighting-prosper-tx",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "https://golandmarktx.com/contact",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "https://golandmarktx.com/",
        permanent: true,
      },
      {
        source: "/tree-trimming",
        destination: "https://golandmarktx.com/",
        permanent: true,
      },
      {
        source: "/artificial-turf",
        destination: "https://golandmarktx.com/prosper-tx",
        permanent: true,
      },
      {
        source:
          "/upgrade-your-home-with-landscape-lightning-service-in-celina-tx",
        destination: "https://golandmarktx.com/landscape-lighting-prosper-tx",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "landmark-xi-six.vercel.app",
          },
        ],
        destination: "https://golandmarktx.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2_678_400,
  },
};

export default nextConfig;

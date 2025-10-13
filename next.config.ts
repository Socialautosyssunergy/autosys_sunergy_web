import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nvwqkpwakpujlmgowmdb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**',
      },
      {
        protocol: 'https',
        hostname: 'autosyssunergy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // React optimizations
  reactStrictMode: true,
  
  // External packages for server components
  serverExternalPackages: ['framer-motion'],

  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Temporarily disabled due to compatibility issues
    // optimizePackageImports: ['lucide-react', '@supabase/supabase-js'], // Disabled due to framer-motion client boundary issues
  },

  // Turbopack configuration (stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude framer-motion from client bundles to avoid export * client boundary issues
    if (!isServer) {
      config.externals = config.externals || {};
      config.externals['framer-motion'] = 'framer-motion';
    }

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          libs: {
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            name: 'libs',
            chunks: 'all',
            priority: 15,
          },
        },
      },
    };

    // Add performance optimizations for production
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Tree shaking improvements
      config.optimization.providedExports = true;
      
      // Minimize asset sizes
      config.optimization.moduleIds = 'deterministic';
      config.optimization.chunkIds = 'deterministic';
    }

    // Optimize video handling
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/media/',
            outputPath: 'static/media/',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*\\.(?:mp4|webm|ogg))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old URLs to new structure
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/solar-panel',
        destination: '/products/solar-panels',
        permanent: true,
      },
      {
        source: '/solar-inverter',
        destination: '/products/solar-inverters',
        permanent: true,
      },
      {
        source: '/residential',
        destination: '/services/residential-solar',
        permanent: true,
      },
      {
        source: '/commercial',
        destination: '/services/commercial-solar',
        permanent: true,
      },
      {
        source: '/industrial',
        destination: '/services/industrial-solar',
        permanent: true,
      },
    ];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return [
      {
        source: '/solar-installation-:city',
        destination: '/services?city=:city&type=installation',
      },
      {
        source: '/solar-panels-:state',
        destination: '/products/solar-panels?state=:state',
      },
    ];
  },

  // Environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },

  // Output configuration - removed 'standalone' for Vercel deployment
  // output: 'standalone', // Only use for Docker deployments
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

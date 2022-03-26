module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/files/',
        destination: '/',
      },
    ];
  },
  sassOptions: {
    additionalData:
      '@import "~include-media/dist/include-media"; @import "@/styles/variable.scss"; @import "@/styles/mixins.scss"; @import "@/styles/theme.scss";',
  },
};

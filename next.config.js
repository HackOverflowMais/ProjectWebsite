/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require('@zeit/next-sass');
const withPWA = require('next-pwa');

module.exports = withPWA(
    withSass({
        cssModules: true,
        webpack: (config, { isServer }) => {
            if (isServer) {
                require('./lib/generate-sitemap');
            }
            return config;
        }
    })
);

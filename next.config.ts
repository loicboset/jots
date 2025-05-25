import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sentry: {
    hideSourceMaps: true,
  },
};

/* eslint-disable @typescript-eslint/no-require-imports */
const runtimeCaching = require("next-pwa/cache");
// eslint-disable-next-line import/order
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  customWorkerDir: "worker",
  maximumFileSizeToCacheInBytes: 8000000,
  runtimeCaching,
  buildExcludes: [
    /app-build-manifest.json$/,
    /dynamic-css-manifest.json$/,
    /\.map$/, // Exclude source maps from precaching
  ],
});

export default withSentryConfig(withPWA(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "jots-o5",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

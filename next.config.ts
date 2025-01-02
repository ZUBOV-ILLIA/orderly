import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["legacy-js-api", "import"],
  },
};

export default withNextIntl(nextConfig);

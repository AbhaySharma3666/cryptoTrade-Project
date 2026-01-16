export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5455',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Crypto Trading AI',
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
};

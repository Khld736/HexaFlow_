import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is always a string by providing a default value
  const resolvedLocale = locale || 'en';
  
  return {
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale // Now this is guaranteed to be a string
  };
});
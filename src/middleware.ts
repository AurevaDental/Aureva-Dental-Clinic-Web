import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Enforce trailing slash removal (except root /)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const cleanPath = url.pathname.slice(0, -1);
    return context.redirect(`${cleanPath}${url.search}`, 301);
  }

  const response = await next();

  // For HTML responses, ensure optimal edge cache headers
  if (response.headers.get('content-type')?.includes('text/html')) {
    if (!response.headers.has('cache-control')) {
      response.headers.set('cache-control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    }
  }

  return response;
});

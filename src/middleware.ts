import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  // 1. Enforce non-www canonical host
  if (url.hostname === 'www.aurevadental.com') {
    url.hostname = 'aurevadental.com';
    url.protocol = 'https:';
    return context.redirect(url.toString(), 301);
  }

  // 2. Enforce trailing slash removal (except root /)
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    const cleanPath = url.pathname.slice(0, -1);
    return context.redirect(`${cleanPath}${url.search}`, 301);
  }

  return next();
});

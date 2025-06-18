// middleware.ts
export { middleware } from '@/lib/middleware';

export const config = {
  matcher: ['/admin/:path*'], // 仅拦截 admin 页面
  runtime: 'nodejs',
};
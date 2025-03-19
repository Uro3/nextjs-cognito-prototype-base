import { auth } from '@/auth';

const publicPaths = ['/'];
const signOutPath = '/signout';

export default auth(async (req) => {
  if (publicPaths.includes(req.nextUrl.pathname)) return;

  const session = req.auth;
  if (!session) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    session.error === 'RefreshTokenError' &&
    req.nextUrl.pathname !== signOutPath
  ) {
    const newUrl = new URL(signOutPath, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

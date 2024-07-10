import { highlightMiddleware } from '@highlight-run/next/server';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const setPathHeaders = (request: NextRequest) => {
  highlightMiddleware(request);

  const headers = new Headers(request.headers);
  const queryParams = request.nextUrl.searchParams.toString();

  headers.set('x-current-path', request.nextUrl.pathname + (queryParams ? `?${queryParams}` : ''));
  headers.set('x-redirect-path', request.nextUrl.searchParams.get('next') ?? '');
  return headers;
};

export function middleware(request: NextRequest) {
  const headers = setPathHeaders(request);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (image files)
     * - public (public files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - manifest.json (manifest file)
     * - manifest.webmanifest (webmanifest file)
     */
    '/((?!api|_next/static|_next/image|images|public|favicon.ico|robots.txt|sitemap.xml|manifest.json|manifest.webmanifest).*)'
  ]
};

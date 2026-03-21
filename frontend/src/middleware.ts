import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROLE_DASHBOARD: Record<string, string> = {
  Learner: '/learner/matches',
  Employer: '/employer/dashboard',
  Institution: '/institution/dashboard',
  SETA: '/seta/dashboard',
  Incubator: '/incubator/dashboard',
};

const ROUTE_ROLE: Record<string, string> = {
  learner: 'Learner',
  employer: 'Employer',
  institution: 'Institution',
  seta: 'SETA',
  incubator: 'Incubator',
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const role = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/register';
  const routePrefix = Object.keys(ROUTE_ROLE).find((p) => pathname.startsWith(`/${p}`));
  const isProtected = !!routePrefix || pathname === '/pending';

  // Logged-in user hitting login/register → send to their dashboard
  if (isAuthPage && token && role) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[role] ?? '/', request.url));
  }

  // Unauthenticated user hitting protected route → login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Wrong-role user hitting another role's route → their own dashboard
  if (routePrefix && role && ROUTE_ROLE[routePrefix] !== role) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD[role] ?? '/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/pending',
    '/learner/:path*',
    '/employer/:path*',
    '/institution/:path*',
    '/seta/:path*',
    '/incubator/:path*',
  ],
};

import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  // Get user session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname === '/') {
    // Redirect to the user's dynamic homepage
    return NextResponse.redirect(new URL(`/${user.id}`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

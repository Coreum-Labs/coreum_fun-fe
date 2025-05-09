import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //disable local development
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/workshop", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

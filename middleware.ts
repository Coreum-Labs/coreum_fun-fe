import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  if (request.url === "https://www.coreum.fun" || request.url === "https://coreum.fun") {
    return NextResponse.redirect(new URL("/workshop", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

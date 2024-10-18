import { NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  "/overview(.*)",
]);

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect()

    // const { userId } = auth();
    // if (userId) {
    //   // Chamar o Lambda para verificar/criar o usuário
    //   await fetch('URL_DO_SEU_API_GATEWAY', {
    //     method: 'POST',
    //     body: JSON.stringify({ userId }),
    //     headers: { 'Content-Type': 'application/json' }
    //   });
    // }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
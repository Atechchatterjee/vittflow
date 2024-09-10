import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard", "/onboarding"]);

export default clerkMiddleware(
  (auth, req) => {
    const { userId, sessionClaims, redirectToSignIn } = auth();
    if (!userId && isProtectedRoute(req)) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboading route to complete onboarding
    if (
      userId &&
      !sessionClaims?.metadata?.onboardingComplete &&
      req.nextUrl.pathname !== "/onboarding"
    ) {
      const onboardingUrl = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && isProtectedRoute(req)) {
      return NextResponse.next();
    }
    if (isProtectedRoute(req)) {
      auth().protect();
    }
  },
  { signInUrl: "/sign-in", signUpUrl: "/sign-up" },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

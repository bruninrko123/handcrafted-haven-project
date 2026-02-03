import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        if (path.startsWith("/dashboard") && token?.role !== "artisan") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                if (path.startsWith("/dashboard")) {
                    return !!token;
                }

                return true;
            }
        }
    }
)

export const config = {
    matcher: ["/dashboard/:path*"]
}
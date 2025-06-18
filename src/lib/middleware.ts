import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  name: string;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/graphql")) {
    return NextResponse.next();
  }

  const cookie = req.headers.get("cookie") || "";
  const tokenMatch = cookie.match(/token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    ) as JwtPayload;

    const headers = new Headers(req.headers);
    headers.set("x-user-id", decoded.id); // already string

    return NextResponse.next({ request: { headers } });
  } catch (err) {
    console.warn("❌ Token verify failed in middleware:", err);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
  runtime: "nodejs", // ✅ ensures JWT works in Edge/Node
};
// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "@/context/AuthContext";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { user } = useAuth();
  const isStudent = user?.roles.includes("student");
  const isDebugger = user?.roles.includes("debugger");

  // فقط مسیرهایی که باید نقش‌محور باشن رو هندل کنیم
  if (url.pathname === "/home") {
    let role: "student" | "debugger" | null = null;

    try {
      if (isStudent) role = "student";
      else if (isDebugger) role = "debugger";
    } catch (e) {
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }

    if (role === "student") {
      url.pathname = "/(student)/home";
      return NextResponse.rewrite(url);
    }

    if (role === "debugger") {
      url.pathname = "/(debugger)/home";
      return NextResponse.rewrite(url);
    }

    return NextResponse.redirect(new URL("/not-authorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home"],
};

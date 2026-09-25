import { NextRequest, NextResponse } from "next/server";
import { verifyAdminLogin } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ success: false, error: "Username and password required" }, { status: 400 });
    }

    const result = await verifyAdminLogin(username, password);
    if (result.success) {
      return NextResponse.json({
        success: true,
        user: result.user,
        token: result.token,
      });
    }
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

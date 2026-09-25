import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }

    const user = { id: String(Date.now()), username, email, role: "user", createdAt: new Date().toISOString() };
    const token = "token_" + Date.now();

    return NextResponse.json({ success: true, user, token });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/server/lib/auth";
import * as authService from "@/server/services/auth.service";

export async function POST(request: Request) {
  try {
    // 1. Lấy user từ Access Token
    const payload = getUserFromToken(request);

    console.log("Logout user:", payload);

    // 2. Xóa Refresh Token của user trong database
    await authService.logout(payload.userId);

    // 3. Trả response
    return NextResponse.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
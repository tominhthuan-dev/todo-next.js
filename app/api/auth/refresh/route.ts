import { NextResponse } from "next/server";
import {verifyRefreshToken,generateAccessToken} from "@/server/lib/jwt";
import * as authService from "@/server/services/auth.service";

export async function POST(request: Request) {
  try {
    // 1. Nhận Refresh Token từ request body
    const body = await request.json();

    const refreshToken = body.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        {
          message: "Refresh Token is required",
        },
        {
          status: 401,
        }
      );
    }

    // 2. Verify Refresh Token
    const payload = verifyRefreshToken(refreshToken);

    console.log("Refresh payload:", payload);

    // 3. Lấy Refresh Token đang lưu trong Database
    const saveRefreshToken = await authService.getRefreshToken(
      payload.userId
    );

    // 4. Kiểm tra Refresh Token
    if (!saveRefreshToken) {
      return NextResponse.json(
        {
          message: "Refresh Token not found",
        },
        {
          status: 401,
        }
      );
    }

    // 5. So sánh token gửi lên với token trong Database
    if (saveRefreshToken !== refreshToken) {
      return NextResponse.json(
        {
          message: "Invalid Refresh Token",
        },
        {
          status: 401,
        }
      );
    }

    // 6. Tạo Access Token mới
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      username: payload.username,
      role: payload.role,
    });

    // 7. Trả Access Token mới
    return NextResponse.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh Token error:", error);

    return NextResponse.json(
      {
        message: "Invalid or expired Refresh Token",
      },
      {
        status: 401,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { getUserFromToken } from "@/server/lib/auth";
import * as adminService from "@/server/services/admin.service";

export async function GET(request: Request) {
  try {
    // Lấy user từ Access Token
    const payload = getUserFromToken(request);

    // Chỉ ADMIN mới được phép
    if (payload.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    // Lấy tất cả user
    const users = await adminService.getAllUsers();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Admin users error:", error);

    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
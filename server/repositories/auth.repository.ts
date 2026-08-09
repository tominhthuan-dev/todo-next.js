import { db } from "@/server/lib/db";

/**
 * Lưu Refresh Token cho user
 */
export async function saveRefreshToken(
  userId: number,
  refreshToken: string
) {
  console.log("===== SAVE REFRESH TOKEN =====");
  console.log("userId:", userId);
  console.log("refreshToken:", refreshToken);
  const [result] = await db.execute(
    "UPDATE users SET refresh_token = ? WHERE id = ?",
    [refreshToken, userId]
  );
   console.log("UPDATE RESULT:", result);
}

/**
 * Xóa Refresh Token khi user logout
 */
export async function removeRefreshToken(userId: number) {
  await db.execute(
    "UPDATE users SET refresh_token = NULL WHERE id = ?",
    [userId]
  );
}

export async function findRefreshToken(userId: number) {
  const [rows] = await db.query<any[]>(
    "SELECT refresh_token FROM users WHERE id = ?",
    [userId]
  );

  return rows[0]?.refresh_token ?? null;
}
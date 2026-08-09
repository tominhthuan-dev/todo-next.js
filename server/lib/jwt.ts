//tạo access token và refresh token, kiểm tra access token và refresh token
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

console.log("Access:", ACCESS_SECRET);
console.log("Refresh:", REFRESH_SECRET);

export interface JwtPayload {
  userId: number;
  username: string;
  role: "ADMIN" | "USER";
}

export function generateAccessToken(payload: JwtPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "1m",
  });
}

export function generateRefreshToken(payload: JwtPayload): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "10m",
  });
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
}
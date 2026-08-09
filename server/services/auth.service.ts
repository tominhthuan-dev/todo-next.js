import * as userRepository from "@/server/repositories/user.repository";
import * as authRepository from "@/server/repositories/auth.repository";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/server/lib/jwt";

export async function register(
    username: string,
    password: string,
) {
    // Kiểm tra username đã tồn tại chưa
    console.log("register", username, password);
    const existingUser = await userRepository.findByUsername(username);
    if (existingUser) {
        throw new Error("Username already exists");
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const user = await userRepository.create(username, hashedPassword, "USER");

    return user;
}

export async function login(username: string, password: string) {
    const user = await userRepository.findByUsername(username);

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid username or password");
    }

    const payload = {
        userId: user.id,
        username: user.username,
        role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await authRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
        },
    };
}

export async function logout(userId: number) {
  return authRepository.removeRefreshToken(userId);
}

export async function getRefreshToken(userId: number) {
  return authRepository.findRefreshToken(userId);
}
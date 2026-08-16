"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./register.module.css"; 

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Kiểm tra dữ liệu phía Client
    if (!username.trim()) {
      setError("Vui lòng nhập username");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập password");
      return;
    }

    if (password.length < 6) {
      setError("Password phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Đăng ký thất bại"
        );
      }

      setSuccess("Đăng ký thành công!");

      // Xóa form
      setUsername("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Đăng ký</h1>
          <p>Tạo tài khoản TodoList</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Nhập username"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Nhập password"
              required
            />
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          {success && (
            <p className={styles.success}>
              {success}
            </p>
          )}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading
              ? "Đang đăng ký..."
              : "Đăng ký"}
          </button>

        </form>

        <div className={styles.footer}>
          <span>Đã có tài khoản?</span>
          <Link href="/login">Đăng nhập</Link>
        </div>
      </div>
    </main>
  );
}
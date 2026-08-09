"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Đăng nhập thất bại");
      }
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    console.log("Login success");

     localStorage.setItem("user",JSON.stringify(data.user));

    console.log("Login success");   

    if (data.user.role === "ADMIN") {
        window.location.href = "/admin/users";
    } else {
        window.location.href = "/dashboard";
    }

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
    <main className={styles.container}>
        <div className={styles.card}>
            <h1>Đăng nhập</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="username">Username</label>

                    <input
                        className={styles.input}
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">Password</label>

                    <input
                        className={styles.input}
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập password"
                    />
                </div>

                {error && (<p className={styles.error}>{error}</p>)}
                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
            <p className={styles.register}> Chưa có tài khoản?{" "} 
                <Link className={styles.registerLink} href="/register"> Đăng ký </Link>
            </p>
        </div>
    </main> 
  );
}
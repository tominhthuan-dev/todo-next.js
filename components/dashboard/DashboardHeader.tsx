"use client";

import { useEffect, useState } from "react";

interface UserInfo {
  userId: number;
  username: string;
  role: "ADMIN" | "USER";
}

export default function DashboardHeader() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    try {
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      setUser({
        userId: payload.userId,
        username: payload.username,
        role: payload.role,
      });
    } catch (error) {
      console.error("Không thể đọc Access Token:", error);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    window.location.href = "/login";
  }

  if (!user) {
    return null;
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* Logo */}
      <div>
        <h2 style={{ margin: 0 }}>
          Todo App
        </h2>
      </div>

      {/* User info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div>
          <strong>{user.username}</strong>

          <span
            style={{
              marginLeft: "8px",
              fontSize: "13px",
              color: "#666",
            }}
          >
            ({user.role})
          </span>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
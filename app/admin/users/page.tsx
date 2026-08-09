"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { logout } from "@/services/auth.service";

type User = {
  id: number;
  username: string;
  role: "ADMIN" | "USER";
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    try {
        setLoading(true);
        setError("");

        const accessToken =localStorage.getItem("accessToken");
        console.log("ADMIN ACCESS TOKEN:", accessToken);
        if (!accessToken) {
            throw new Error("Bạn chưa đăng nhập");
        }

      const response = await fetch(
        "/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Không thể lấy danh sách user"
        );
      }

      setUsers(data);
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

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Đang tải danh sách user...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <main className={styles.container}>
        <header className={styles.header}>
            <div>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <p className={styles.subtitle}>Quản lý người dùng hệ thống</p>
            </div>
            <button onClick={logout} className={styles.logoutButton}>
                Đăng xuất
            </button>
        </header>

        <section className={styles.card}>
            <div className={styles.tableHeader}>
                <h2 className={styles.tableTitle}>Danh sách người dùng</h2>

                <span className={styles.total}>
                    Tổng: {users.length} user
                </span>
            </div>

            {users.length === 0 ? (
                <div className={styles.empty}>Chưa có người dùng nào.</div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className={styles.id}>#{user.id}</td>
                                    <td className={styles.username}>{user.username}</td>
                                    <td>
                                        <span className={`${styles.role} ${user.role === "ADMIN"? styles.admin : styles.user}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>{new Date(user.created_at).toLocaleDateString("vi-VN")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    </main>
  );
}
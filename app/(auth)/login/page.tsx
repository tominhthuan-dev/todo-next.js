"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { useDispatch,useSelector } from "react-redux";
import { loginRequest } from "@/redux/actions/authActions";
import router from "next/dist/shared/lib/router/router";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {user, loading, error} = useSelector((state:any)=>state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    useEffect(() => {
        if (!user) return;
        console.log("User:", user);
    console.log("Role:", user.role);
        if (user.role === "ADMIN") {
           router.push("/admin/users");
        } else {
            router.push("/dashboard");
        }
    },[user, router]);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(
            loginRequest(username, password)
        );
    };


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
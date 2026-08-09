import { db } from "@/server/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { User } from "@/types/user";

export async function findAll(): Promise<User[]> {
    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT
            id,
            username,
            role,
            created_at
        FROM users
        ORDER BY id DESC
        `
    );

    return rows as User[];
}

export async function findById(id: number): Promise<User | null> {

    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT *
        FROM users
        WHERE id = ?
        `,
        [id]
    );

    return rows.length ? (rows[0] as User) : null;
}

export async function findByUsername(username: string): Promise<User | null> {
    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT *
        FROM users
        WHERE username = ?
        `,
        [username]
    );

    return rows.length ? (rows[0] as User) : null;
}

export async function create(
    username: string,
    password: string,
    role: string = "USER"
): Promise<User> {
    console.log("create", username, password, role);
    const [result] = await db.execute<ResultSetHeader>(
        `
        INSERT INTO users(username,password,role)

        VALUES(?,?,?)
        `,
        [username, password, role]
    );

    const [rows] = await db.query<RowDataPacket[]>(
        `
        SELECT *
        FROM users
        WHERE id=?
        `,
        [result.insertId]
    );

    return rows[0] as User;
}

export async function updatePassword(
    id: number,
    password: string
): Promise<void> {

    await db.execute(
        `
        UPDATE users
        SET password=?
        WHERE id=?
        `,
        [password, id]
    );
}

export async function updateRefreshToken(
    id: number,
    refreshToken: string | null
): Promise<void> {

    await db.execute(
        `
        UPDATE users
        SET refresh_token=?
        WHERE id=?
        `,
        [refreshToken, id]
    );
}

export async function remove(id: number): Promise<void> {

    await db.execute(
        `
        DELETE
        FROM users
        WHERE id=?
        `,
        [id]
    );
}
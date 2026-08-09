import { db} from "@/server/lib/db";
import {RowDataPacket, ResultSetHeader} from "mysql2";//
import { Todo } from "@/types/todo";

export async function findAll(userId: number): Promise<Todo[]> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM todos WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );
  return rows as Todo[];
}

export async function create(title: string, userId: number ): Promise<Todo> {
  //ResultSetHeader là insertId, affectedRows, warningStatus
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)",
    [title, false, userId]
  );

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM todos WHERE id = ?",
    [result.insertId]
  );

   return rows[0] as Todo;
}

export async function remove(id: number, userId: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM todos WHERE id = ? AND user_id = ?",
    [id, userId]
  );

  return result.affectedRows > 0;
}


export async function update(id: number, title: string, userId: number): Promise<Todo | null> {
  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE todos SET title = ? WHERE id = ? AND user_id = ?",
    [title, id, userId]
  );

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM todos WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return null;
  }
  return rows[0] as Todo;
}

export async function toggle(id: number, userId: number): Promise<Todo | null> {
    await db.execute<ResultSetHeader>(
        "UPDATE todos SET completed = NOT completed WHERE id = ? AND user_id = ?",
        [id, userId]
    );

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM todos WHERE id = ?", 
      [id]
    );
    return rows[0] as Todo;
}
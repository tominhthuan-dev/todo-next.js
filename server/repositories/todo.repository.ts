import { db} from "@/server/lib/db";
import {RowDataPacket, ResultSetHeader} from "mysql2";//
import { Todo } from "@/types/todo";

export async function findAll(): Promise<Todo[]> {
  const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM todos ORDER BY id DESC");
  return rows as Todo[];
}

export async function create(title: string): Promise<Todo> {
  //ResultSetHeader là insertId, affectedRows, warningStatus
  const [result] = await db.execute<ResultSetHeader>(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [title, false]
  );

  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT * FROM todos WHERE id = ?",
    [result.insertId]
  );

   return rows[0] as Todo;
}

export async function remove(id: number): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}


export async function update(id: number, title: string): Promise<Todo | null> {
  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, id]
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

export async function toggle(id: number): Promise<Todo | null> {
    await db.execute<ResultSetHeader>(
        "UPDATE todos SET completed = NOT completed WHERE id = ?",
        [id]
    );

    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM todos WHERE id = ?", 
      [id]
    );
    return rows[0] as Todo;
}
import { NextResponse } from "next/server";
import * as  todoService from "@/server/services/todo.service";
import { getUserFromToken } from "@/server/lib/auth";

export async function GET(request: Request) {
  try {
    const payload = getUserFromToken(request);
    const todos = await todoService.findAllTodos(payload.userId);
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = getUserFromToken(request);
    const body = await request.json();

    const todo = await todoService.createTodo(body.title, payload.userId);

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
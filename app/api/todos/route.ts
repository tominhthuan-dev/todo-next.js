import { NextResponse } from "next/server";
import * as  todoService from "@/server/services/todo.service";

export async function GET() {
  const todos = await todoService.findAllTodos();

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const body = await request.json();

  const todo = await todoService.createTodo(body.title);

  return NextResponse.json(todo, { status: 201 });
}
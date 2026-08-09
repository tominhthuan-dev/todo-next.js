import { NextResponse } from "next/server";
import * as todoService from "@/server/services/todo.service";
import { getUserFromToken } from "@/server/lib/auth";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const payload = getUserFromToken(request);
    const { id } = await context.params;

    const success = await todoService.deleteTodo(Number(id), payload.userId);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json(
      { message: "Todo không tồn tại" },
      { status: 404 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const payload = getUserFromToken(request);
    const { id } = await context.params;
    const body = await request.json();
    const todo = await todoService.updateTodo(Number(id), body.title, payload.userId);
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { message: "Todo không tồn tại" },  
    { status: 404 }
    );
  }
}
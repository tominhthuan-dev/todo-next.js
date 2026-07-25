import { NextResponse } from "next/server";
import * as todoService from "@/server/services/todo.service";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  console.log("DELETE được gọi");
  const { id } = await context.params;

  const success = await todoService.deleteTodo(Number(id));

  if (!success) {
    return NextResponse.json(
      { message: "Todo không tồn tại" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Xóa thành công",
  });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  const todo = await todoService.updateTodo(Number(id), body.title);

  if (!todo) {
    return NextResponse.json(
      { message: "Todo không tồn tại" },
      { status: 404 }
    );
  }
  return NextResponse.json(todo);
}
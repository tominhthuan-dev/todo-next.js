import { NextResponse } from "next/server";
import * as todoService from "@/server/services/todo.service";

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const todo =await todoService.toggleTodo(Number(id));

    if (!todo) {
        return NextResponse.json(
            { message: "Todo không tồn tại" },
            { status: 404 }
        );
    }

    return NextResponse.json(todo);
}
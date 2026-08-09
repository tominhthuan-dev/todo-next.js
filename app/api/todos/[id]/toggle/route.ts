import { NextResponse } from "next/server";
import * as todoService from "@/server/services/todo.service";
import { getUserFromToken } from "@/server/lib/auth";

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const payload = getUserFromToken(request);
        const { id } = await context.params;
        const todo = await todoService.toggleTodo(Number(id), payload.userId);
        return NextResponse.json(todo);
    } catch (error) {
        return NextResponse.json(
            { message: "Todo không tồn tại" },
            { status: 404 }
        );
    }
}
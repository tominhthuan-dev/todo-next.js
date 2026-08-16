import { apiClient } from "./api-client";
function getAccessToken() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Bạn chưa đăng nhập");
    }

    return token;
}

// GET - Lấy Todo của user hiện tại
export async function getTodos() {
    const response = await apiClient(`/todos`, {
        method: "GET",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to fetch todos"
        );
    }

    return response.json();
}


// POST - Thêm Todo
export async function createTodo(title: string) {
    const response = await apiClient(`/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to create todo"
        );
    }

    return response.json();
}


// PATCH - Sửa Todo
export async function updateTodo(id: number, title: string) {
    const response = await apiClient(`/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to update todo"
        );
    }

    return response.json();
}


// DELETE - Xóa Todo
export async function deleteTodo(id: number) {
    const response = await apiClient(`/todos/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to delete todo"
        );
    }

    return true;
}


// PATCH - Toggle Todo
export async function toggleTodo(id: number) {
    const response = await apiClient(`/todos/${id}/toggle`, {
        method: "PATCH",
    }); 

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to toggle todo"
        );
    }

    return response.json();
}
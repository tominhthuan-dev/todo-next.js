import BASE_URL from "./api";

export async function getTodos() {
    const response = await fetch(`${BASE_URL}/todos`);

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
}
    

export async function createTodo(title: string) {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }
    return response.json();
}

export async function updateTodo(id: number, title: string) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
    });
    if (!response.ok) {
        throw new Error("Failed to update todo");
    }
    return response.json();
}

export async function deleteTodo(id: number) {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
    }); 

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }   
}

export async function toggleTodo(id: number) {
    const response = await fetch(`${BASE_URL}/todos/${id}/toggle`, {
        method: "PATCH",
    });

    if (!response.ok) {
        throw new Error("Failed to toggle todo");
    }

    return response.json();
}
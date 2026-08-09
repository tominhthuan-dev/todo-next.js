import * as repository from "@/server/repositories/todo.repository";
import todoCache from "../cache/todo.cache";

export async function findAllTodos(userId: number) {
  // Kiểm tra Cache trước
  const cachekey = `todos:${userId}`;
  const cachedTodos = todoCache.get(cachekey);

  if (cachedTodos) {
    console.log("Cache Hit");
    return cachedTodos;
  }

  console.log("Cache Miss");

  // Cache không có -> lấy từ MySQL
  const todos = await repository.findAll(userId);

  // Lưu vào Cache
  todoCache.set(cachekey, todos);

  return todos;
}

export async function createTodo(title: string, userId: number) {
    const todo = await repository.create(title, userId);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete(`todos:${userId}`);
    console.log("delete Cache");
    return todo;
}

export async function updateTodo(id: number, title: string, userId: number) {
    const todo = await repository.update(id, title, userId);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete(`todos:${userId}`);

    return todo;
}

export async function deleteTodo(id: number, userId: number) {
    const todo = await repository.remove(id, userId);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete(`todos:${userId}`);

    return todo;
}

export async function toggleTodo(id: number, userId: number) {
    const todo = await repository.toggle(id, userId);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete(`todos:${userId}`);

    return todo;
}
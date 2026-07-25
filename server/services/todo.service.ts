import * as repository from "@/server/repositories/todo.repository";
import todoCache from "../cache/todo.cache";

export async function findAllTodos() {
  // Kiểm tra Cache trước
  const cachedTodos = todoCache.get("todos");

  if (cachedTodos) {
    console.log("Cache Hit");
    return cachedTodos;
  }

  console.log("Cache Miss");

  // Cache không có -> lấy từ MySQL
  const todos = await repository.findAll();

  // Lưu vào Cache
  todoCache.set("todos", todos);

  return todos;
}

export async function createTodo(title: string) {
    const todo = await repository.create(title);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete("todos");
    console.log("delete Cache");
    return todo;
}

export async function updateTodo(id: number, title: string) {
    const todo = await repository.update(id, title);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete("todos");

    return todo;
}

export async function deleteTodo(id: number) {
    const todo = await repository.remove(id);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete("todos");

    return todo;
}

export async function toggleTodo(id: number) {
    const todo = await repository.toggle(id);
    // Dữ liệu thay đổi -> xóa Cache
    todoCache.delete("todos");

    return todo;
}
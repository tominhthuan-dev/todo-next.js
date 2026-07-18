import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onDeleteTodo: (id: number) => void;
  onToggleTodo: (id: number) => void;
  onEditTodo: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  onDeleteTodo,
  onToggleTodo,
  onEditTodo,
}: TodoListProps) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={() => onDeleteTodo(todo.id)}
          onToggle={() => onToggleTodo(todo.id)}
          onEdit={() => onEditTodo(todo)}
        />
      ))}
    </>
  );
}
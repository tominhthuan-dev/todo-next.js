"use client";

import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { mockTodos } from "@/data/mockTodos";
import { Todo } from "@/types/todo";

export default function TodoContainer() {
    const [todos, setTodos] = useState<Todo[]>(mockTodos);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos( newTodos );
  };

    const toggleTodo = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {   
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(newTodos);
    };


  
  const editTodo = (todo: Todo) => {
    setEditingTodo(todo);
}

    const updateTodo = (title: string) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === editingTodo?.id) {
                return { ...todo, title };
            }
            return todo;
        }); 

        setTodos(newTodos);
        setEditingTodo(null);
    };
  return (
    <>
      <TodoForm onAddTodo={addTodo} onUpdateTodo={updateTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} onEditTodo={editTodo} />
    </>
  );
}
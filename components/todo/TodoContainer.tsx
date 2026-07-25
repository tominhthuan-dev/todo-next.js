"use client";

import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";
import {getTodos, createTodo, updateTodo as updateTodoApi , deleteTodo as deleteTodoApi, toggleTodo as toggleTodoApi} from "@/services/todo.service";

export default function TodoContainer() {
    const [todos, setTodos] = useState<Todo[]>([]); 
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const fetchedTodos = await getTodos();
                console.log(fetchedTodos);
                console.log(Array.isArray(fetchedTodos));
                setTodos(fetchedTodos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        }
        fetchTodos();
    }, []);

  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      console.log("New Todo:", newTodo);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoApi(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

    const toggleTodo = async (id: number) => {
        try {
            const updatedTodo = await toggleTodoApi(id);

            setTodos((prev) =>
                prev.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo)
            );
        } catch (error) {
            console.error(error);
        }
    };


  
    const editTodo = (todo: Todo) => {
        setEditingTodo(todo);
    }

    const handleUpdateTodo = async (title: string) => {
        if (!editingTodo) return;
        try {
            const updatedTodo = await updateTodoApi(editingTodo.id, title);
            setTodos((prev) => prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
            setEditingTodo(null);
        } catch (error) {
            console.error("Error updating todo:", error);
        }  
    };
  return (
    <>
      <TodoForm onAddTodo={addTodo} onUpdateTodo={handleUpdateTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} onEditTodo={editTodo} />
    </>
  );
}
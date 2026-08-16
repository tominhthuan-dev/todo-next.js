"use client";

import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";

import {useDispatch,useSelector} from "react-redux";
import {fetchTodosRequest, addTodoRequest, deleteTodoRequest, updateTodoRequest, toggleTodoRequest} from "@/redux/actions/todoActions";

export default function TodoContainer() {
const dispatch = useDispatch();

const reduxTodos = useSelector((state: any) => state.todo.todos);
const loading = useSelector((state: any) => state.loading);
const error = useSelector((state: any) => state.error);
  
  const [todos, setTodos] = useState<Todo[]>([]); 
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  useEffect(() => {
    setTodos(reduxTodos);
  }, [reduxTodos]);
  
  const addTodo = async (title: string) => {
    console.log("Container nhận:", title);
    dispatch(addTodoRequest(title));
  };

const deleteTodo = (id: number) => {
  dispatch(deleteTodoRequest(id));
};

    const toggleTodo = async (id: number) => {
      dispatch(toggleTodoRequest(id));
    };


  
    const editTodo = (todo: Todo) => {
        setEditingTodo(todo);
    }

  const handleUpdateTodo = (title: string) => {
    if (!editingTodo) return;

    dispatch(updateTodoRequest(editingTodo.id,title));

    setEditingTodo(null);
  };

  return (
    <>
      {loading && (
        <p>Đang tải Todo...</p>
      )}

      {error && (
        <p>Lỗi: {error}</p>
      )}
      <TodoForm onAddTodo={addTodo} onUpdateTodo={handleUpdateTodo} editingTodo={editingTodo} />
      <TodoList todos={todos} onDeleteTodo={deleteTodo} onToggleTodo={toggleTodo} onEditTodo={editTodo} />
    </>
  );
}
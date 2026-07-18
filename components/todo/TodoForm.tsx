"use client";
import { Todo } from "@/types/todo";
import styles from "./TodoForm.module.css";
import { useEffect, useState } from "react";

interface TodoFormProps {
    onAddTodo: (title: string) => void;
    onUpdateTodo: (title: string) => void;
    editingTodo: Todo | null;
}

export default function TodoForm({ onAddTodo, onUpdateTodo, editingTodo  }: TodoFormProps) {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
        } else {
            setTitle("");
        }
    }, [editingTodo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        if (editingTodo) {
             onUpdateTodo(title);
        } else {
            onAddTodo(title);
        }
    };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nhập công việc..."
        className={styles.input}
      />

      <button type="submit" className={styles.addButton}>
        {editingTodo ? "Update" : "Add"}
      </button>
    </form>
  );
}
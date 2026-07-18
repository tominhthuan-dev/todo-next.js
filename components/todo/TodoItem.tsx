import styles from "./TodoItem.module.css";
import { Todo } from "@/types/todo";

interface TodoItemProps {
    todo: Todo;
    onDelete: () => void;
    onToggle: () => void;
    onEdit: () => void;
}

export default function TodoItem({ todo, onDelete, onToggle, onEdit }: TodoItemProps) {
    return (
        <div className={styles.todoItem}>
            <div className={styles.left}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                />
                <span className={`${styles.title} ${ todo.completed ? styles.completed : "" }`}> {todo.title} </span>
            </div>
            <div className={styles.actions}>
                <button className={styles.edit} onClick={onEdit}>
                    Edit
                </button>
                <button className={styles.delete} onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}
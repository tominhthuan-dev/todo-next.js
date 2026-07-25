import styles from "./page.module.css";
import TodoContainer from "@/components/todo/TodoContainer";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>My Todos</h1>
        <div className={styles.todoWrapper}>
            <TodoContainer />
        </div>
    </div>
  );
}
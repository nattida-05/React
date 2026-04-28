// App.js

import { useState } from "react";
import TaskInput from "./Component/TaskInput";
import TaskItem from "./Component/TaskItem";
import "./App.css";
let nextId = 1;

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddTask(text) {
    setTasks([
      {
        id: nextId++,
        text,
        completed: false,
      },
      ...tasks,
    ]);
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
  }

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <main id="center">
      <div className="todo-card">
        <h1>

          <img
            src="https://i.pinimg.com/736x/5a/5e/c8/5a5ec8d2b30f0bc564dd31557cb43266.jpg"
            alt="icon"
            className="title-icon"
          />

          My To-Do List</h1>

        <TaskInput onAddTask={handleAddTask} />

        <div className="task-summary">
          <span>{activeTasks.length} tasks remaining</span>
          <span>{completedTasks.length} completed</span>
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "active" ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={filter === "completed" ? "filter-btn active-filter" : "filter-btn"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>

        {completedTasks.length > 0 && (
          <button
            className="clear-btn"
            onClick={handleClearCompleted}
          >
            Clear {completedTasks.length} Completed
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
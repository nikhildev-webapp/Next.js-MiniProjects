"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

const initialTodos: Todo[] = [
  { id: 1, title: "Review project proposal", completed: true },
  { id: 2, title: "Design the landing page", completed: false },
  { id: 3, title: "Prepare launch checklist", completed: false },
];

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="m5 10 3.2 3.2L15.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4.5 6.5h11M8 3.5h4l.8 2.2H7.2L8 3.5ZM6.5 8.5v6m3.5-6v6m3.5-6v6M5.5 6.5l.6 10h7.8l.6-10" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Filter>("all");
  const [newTodo, setNewTodo] = useState("");
  const hasLoadedTodos = useRef(false);

  useEffect(() => {
    const savedTodos = window.localStorage.getItem("focus-todos");

    queueMicrotask(() => {
      let todosToRestore = initialTodos;

      if (savedTodos) {
        try {
          const parsedTodos = JSON.parse(savedTodos) as Todo[];
          if (Array.isArray(parsedTodos)) todosToRestore = parsedTodos;
        } catch (error) {
          console.warn("Unable to restore saved tasks. Starting with the default list.", error);
        }
      }

      setTodos(todosToRestore);
      window.localStorage.setItem("focus-todos", JSON.stringify(todosToRestore));
      hasLoadedTodos.current = true;
    });
  }, []);

  useEffect(() => {
    if (hasLoadedTodos.current) {
      window.localStorage.setItem("focus-todos", JSON.stringify(todos));
    }
  }, [todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;
  const visibleTodos = useMemo(
    () => todos.filter((todo) => filter === "all" || (filter === "active" ? !todo.completed : todo.completed)),
    [filter, todos],
  );

  function addTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    setTodos((current) => [...current, { id: Date.now(), title, completed: false }]);
    setNewTodo("");
  }

  function toggleTodo(id: number) {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  function removeTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div>
            <p className="eyebrow">Monday, September 16</p>
            <h1>Good morning, Alex <span aria-hidden="true">✦</span></h1>
            <p className="subtitle">Make today count, one task at a time.</p>
          </div>
          <div className="progress-ring" aria-label={`${completedCount} of ${todos.length} tasks complete`}>
            <strong>{todos.length ? Math.round((completedCount / todos.length) * 100) : 0}%</strong>
            <span>done</span>
          </div>
        </header>

        <form className="add-form" onSubmit={addTodo}>
          <input
            aria-label="New task"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit" aria-label="Add task" className="add-button">
            <PlusIcon />
            <span>Add task</span>
          </button>
        </form>

        <section className="todo-card" aria-label="Todo list">
          <div className="list-toolbar">
            <div>
              <h2>My tasks</h2>
              <p>{remainingCount === 0 ? "Everything is complete" : `${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} remaining`}</p>
            </div>
            <div className="filters" role="group" aria-label="Filter tasks">
              {(["all", "active", "completed"] as Filter[]).map((option) => (
                <button
                  className={filter === option ? "filter-button selected" : "filter-button"}
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="tasks">
            {visibleTodos.length ? visibleTodos.map((todo) => (
              <article className={todo.completed ? "task completed" : "task"} key={todo.id}>
                <button
                  type="button"
                  className="check-button"
                  aria-label={todo.completed ? `Mark ${todo.title} as active` : `Complete ${todo.title}`}
                  aria-pressed={todo.completed}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed && <CheckIcon />}
                </button>
                <span className="task-title">{todo.title}</span>
                <button type="button" className="delete-button" aria-label={`Delete ${todo.title}`} onClick={() => removeTodo(todo.id)}>
                  <TrashIcon />
                </button>
              </article>
            )) : (
              <div className="empty-state">
                <span aria-hidden="true">✓</span>
                <strong>No {filter} tasks</strong>
                <p>{filter === "completed" ? "Complete a task and it will appear here." : "Add something small to get started."}</p>
              </div>
            )}
          </div>

          <footer className="list-footer">
            <span><i className="status-dot" aria-hidden="true" /> {completedCount} completed</span>
            {completedCount > 0 && (
              <button type="button" className="clear-button" onClick={() => setTodos((current) => current.filter((todo) => !todo.completed))}>
                Clear completed
              </button>
            )}
          </footer>
        </section>

        <p className="tip"><span aria-hidden="true">⌘</span> Tip: Keep your list focused. Three priorities are enough for a great day.</p>
      </div>
    </main>
  );
}

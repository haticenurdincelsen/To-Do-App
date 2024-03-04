import React, { useState } from 'react';
import './App.css';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn JavaScript', completed: true },
    { id: 2, text: 'Learn React', completed: false },
    { id: 3, text: 'Have a life!', completed: false }
  ]);

  const [filter, setFilter] = useState('all');

  const handleToggle = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleAdd = (text) => {
    if (text.trim() !== '') {
      const newTodo = { id: todos.length + 1, text: text, completed: false };
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd(event.target.value);
      event.target.value = '';
    }
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'active') {
      return !todo.completed;
    }
    return true;
  });

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyPress={handleKeyPress} />
        </form>
      </header>

      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="view">
                <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => handleToggle(todo.id)} />
                <label>{todo.text}</label>
                <button className="destroy" onClick={() => handleDelete(todo.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter(todo => !todo.completed).length}</strong> items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" onClick={() => handleFilter('all')}>All</a>
          </li>
          <li>
            <a href="#/" onClick={() => handleFilter('completed')}>Completed</a>
          </li>
          <li>
            <a href="#/" onClick={() => handleFilter('active')}>Active</a>
          </li>
        </ul>

        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}

export default TodoApp;
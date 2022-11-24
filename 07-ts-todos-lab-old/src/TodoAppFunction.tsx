import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { TodosApi } from './rest-api-client';
import { Optional } from './shared-types';
import { Todo, TodoStatus } from './todo-model';
import { equals } from './TodoApp';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export type FilterType = TodoStatus | undefined;

function TodoAppFunction() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(undefined);
  const [errors, setErrors] = useState<Optional<string>>(undefined);
  const [editedTodo, setEditedTodo] = useState<Optional<Todo>>(undefined);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    TodosApi.findAll().then(allTodos => {
      setTodos(allTodos);
      setErrors(undefined);
    }).catch(err => setErrors((err as any).toString()));
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      setCounter(counter => counter + 1);
    }, 2000);
  }, []);

  const handleTodoDelete = useCallback(async (todo: Todo) => {
    try {
      await TodosApi.deleteById(todo.id);
      setTodos((todos) => todos.filter(td => td.id !== todo.id));
      setErrors(undefined);
    } catch (err) {
      setErrors((err as any).toString());
    }
  }, []);

  const handleTodoSubmit = useCallback(async (todo: Todo) => {
    try {
      if (todo.id) { // update todo
        const updated = await TodosApi.update(todo);
        setTodos(todos => todos.map(td => td.id === updated.id ? updated : td));
        setErrors(undefined);
      } else { // create todo
        const created = await TodosApi.create(todo);
        setTodos(todos => todos.concat(created));
        setErrors(undefined);
      }
    } catch (err) {
      setErrors((err as any).toString());
    }
  },[]);

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
  }

  const handleEditTodo = useCallback((todo: Todo) => {
    setEditedTodo(todo);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>React TODOs Demo</h2>
        {errors && <div className='errors'>{errors}</div>}
        <TodoInput key={editedTodo?.id} todo={editedTodo} onSubmitTodo={handleTodoSubmit}>
          <label htmlFor='id'>Todo ID</label>
          <label htmlFor='text'>Todo Text</label>
          <label htmlFor='status'>Todo <i>Status</i></label>
          <label htmlFor='deadline'>Todo <b>Deadline</b></label>
        </TodoInput>
        <TodoFilter filter={filter} onFilterChange={handleFilterChange} />
        <TodoList
          todos={todos}
          filter={filter}
          equals={equals}
          onUpdateTodo={handleTodoSubmit}
          onDeleteTodo={handleTodoDelete}
          onEditTodo={handleEditTodo}
        />
      </header>
    </div>
  );
}

export default TodoAppFunction;


import React, { useCallback, useEffect, useState } from 'react';
import './TodoApp.css';
import { Todo, TodoCreateDTO, TodoStatus } from '../model/todos';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import { IdType } from '../shared/common-types';
import { ApiClient, ApiClientImpl } from '../service/todos-api-client';
import { useOnMountAsync } from './hooks/useOnMount';
import { useLoading } from './hooks/useIsLoading';

export type FilterType = TodoStatus | undefined;

export type FilterChangeListener = (filterChange: FilterType) => void

const API_CLIENT: ApiClient<IdType, Todo> = new ApiClientImpl<IdType, Todo>('todos');

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<string | undefined>();
  const [editedTodo, setEditedTodo] = useState<Todo | undefined>();
  const [filter, setFilter] = useState<FilterType>();

  const [isLoading, load] = useLoading<Todo[]>();
  // load(Promise<R>): Promise<R>

  useOnMountAsync(async () => {
    try {
      const todos = await load(API_CLIENT.findAll());
      setTodos(todos);
    } catch (err) {
      setErrors('' + err);
    }
  }); // <=> componentDidMount

  const handleUpdateTodo = useCallback(async (todo: Todo) => {
    try {
      const updated = await API_CLIENT.update(todo);
      setTodos((oldTodos) => oldTodos.map(td => td.id === updated.id ? updated : td));
      setErrors(undefined);
    } catch (err) {
      setErrors('' + err);
    }
  }, []);

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      await API_CLIENT.deleteById(todo.id);
      setTodos(oldTodos => oldTodos.filter(td => td.id !== todo.id));
      setErrors(undefined);
    } catch (err) {
      setErrors('' + err);
    }
  }

  const handleTodoSubmit = useCallback(
    async (todo: Todo | TodoCreateDTO) => {
      try {
        if ('id' in todo) {// edit mode
          await handleUpdateTodo(todo);
          setEditedTodo(undefined);
        } else { // create mode
          const created = await API_CLIENT.create(todo);
          setTodos(oldTodos => oldTodos.concat(created));
          setEditedTodo(editedTodo ? undefined : new Todo(0, '', ''));
          setErrors(undefined);
        }
      } catch (err) {
        setErrors('' + err);
      }
    },
    [editedTodo, handleUpdateTodo]
  );



  const handleTodoEdit = (todo: Todo) => {
    setEditedTodo(todo);
  }

  const handleCancel = () => {
    setEditedTodo(undefined);
  }

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
  }

  return (
    <div className="TodoApp">
      <header className="TodoApp-header">
        <h1>React TODOs Demo</h1>
        {errors && <div className='errors'>{errors}</div>}
        <TodoInput key={editedTodo?.id} todo={editedTodo}
          onTodoSubmit={handleTodoSubmit} onTodoCancel={handleCancel} />
        <TodoFilter filter={filter} onFilterChange={handleFilterChange} />
        <TodoList todos={todos} filter={filter} isLoading={isLoading}
          onUpdateTodo={handleUpdateTodo}
          onEditTodo={handleTodoEdit}
          onDeleteTodo={handleDeleteTodo} />
      </header>
    </div>
  );
}

export default TodoApp;

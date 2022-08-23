import React, { Component } from 'react';
import './App.css';
import MOCK_TODOS from './mock-todos';
import { TodosApi } from './rest-api-client';
import { Immutable, Optional } from './shared-types';
import { Todo, TodoStatus } from './todo-model';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export type FilterType = TodoStatus | undefined;

export interface TodoAppState {
  todos: Todo[];
  filter: FilterType;
  errors: string | undefined;
  editedTodo: Optional<Todo>;
}

export default class AppClass extends Component<{}, TodoAppState> {
  state: Immutable<TodoAppState> = {
    todos: [],
    filter: undefined,
    errors: undefined,
    editedTodo: undefined
  }

  async componentDidMount() {
    try {
      const allTodos = await TodosApi.findAll();
      this.setState({ todos: allTodos, errors: undefined });
    } catch (err) {
      this.setState({ errors: (err as any).toString() })
    }
  }

  handleTodoDelete = async (todo: Todo) => {
    try {
      await TodosApi.deleteById(todo.id);
      this.setState(({ todos }) => ({
        todos: todos.filter(td => td.id !== todo.id),
        errors: undefined
      }));
    } catch (err) {
      this.setState({ errors: (err as any).toString() })
    }
    this.setState(({ todos }) => ({ todos: todos.filter(td => td.id !== todo.id) }));
  }

  handleTodoSubmit = async (todo: Todo) => {
    try {
      if (todo.id) { // update todo
        const updated = await TodosApi.update(todo);
        this.setState(({ todos }) => ({
          todos: todos.map(td => td.id === updated.id ? updated : td),
          errors: undefined
        }));
      } else { // create todo
        const created = await TodosApi.create(todo);
        this.setState(({ todos }) => ({
          todos: todos.concat(created),
          errors: undefined
        }));
      }
    } catch (err) {
      this.setState({ errors: (err as any).toString() })
    }
  }

  handleFilterChange = (filter: FilterType) => {
    this.setState({ filter: filter });
  }

  handleEditTodo = (todo: Todo) => {
    this.setState({ editedTodo: todo })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React TODOs Demo</h2>
          {this.state.errors && <div className='errors'>{this.state.errors}</div>}
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo} onSubmitTodo={this.handleTodoSubmit}>
            <label htmlFor='id'>Todo ID</label>
            <label htmlFor='text'>Todo Text</label>
            <label htmlFor='status'>Todo Status</label>
            <label htmlFor='deadline'>Todo <b>Deadline</b></label>
          </TodoInput>
          <TodoFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdateTodo={this.handleTodoSubmit}
            onDeleteTodo={this.handleTodoDelete}
            onEditTodo={this.handleEditTodo}
          />
        </header>
      </div>
    );
  }
}




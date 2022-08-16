import React, { Component } from 'react';
import './App.css';
import MOCK_TODOS from './mock-todos';
import { Todo, TodoStatus } from './todo-model';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export type FilterType = TodoStatus | undefined;

export interface TodoAppState {
  todos: Todo[];
  filter: FilterType
}

export default class AppClass extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    todos: MOCK_TODOS,
    filter: undefined
  }

  constructor(props: {}) {
    super(props);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this)
    this.handleTodoDelete = this.handleTodoDelete.bind(this)
  }

  handleTodoUpdate(todo: Todo) {
    this.setState(({todos}) => ({todos: todos.map(td => td.id === todo.id? todo: td)}));
  }
  handleTodoDelete(todo: Todo) {
    this.setState(({todos}) => ({todos: todos.filter(td => td.id !== todo.id)}));
  }

  handleTodocreate = (todo: Todo) => {
    this.setState(({todos}) => ({todos: todos.concat(todo)}));
  }

  handleFilterChange = (filter: FilterType) => {
    this.setState({filter: filter});
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React TODOs Demo</h2>
          <TodoInput onCreateTodo={this.handleTodocreate} />
          <TodoFilter filter={this.state.filter} onFilterChange={this.handleFilterChange}/>
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdateTodo={this.handleTodoUpdate}
            onDeleteTodo={this.handleTodoDelete}
          />
        </header>
      </div>
    );
  }
}




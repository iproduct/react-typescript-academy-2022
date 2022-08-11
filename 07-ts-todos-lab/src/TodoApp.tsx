import React, { Component } from 'react';
import './App.css';
import MOCK_TODOS from './mock-todos';
import { Todo, TodoStatus } from './todo-model';
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

  handleTodoUpdate(todo: Todo) {
    this.setState(({todos}) => ({todos: todos.map(td => td.id === todo.id? todo: td)}));
  }
  handleTodoDelete(todo: Todo) {
    this.setState(({todos}) => ({todos: todos.map(td => td.id === todo.id? todo: td)}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>React TODOs Demo</h2>
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onUpdateTodo={this.handleTodoUpdate.bind(this)}
            onDeleteTodo={this.handleTodoUpdate.bind(this)}
          />
        </header>
      </div>
    );
  }
}




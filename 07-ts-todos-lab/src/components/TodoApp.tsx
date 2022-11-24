import React, { Component } from 'react';
import './TodoApp.css';
import MOCK_TODOS from '../model/mock-todos';
import { Todo } from '../model/todos';
import TodoList from './TodoList';

interface AppState {
  todos: Todo[];
}


export default class App extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    todos: MOCK_TODOS
  }
  interval: NodeJS.Timer | undefined;

  render() {
    return (
      <div className="TodoApp">
        <header className="TodoApp-header">
          <h1>React TODOs Demo</h1>
          <TodoList todos={this.state.todos} />
        </header>
      </div>
    );
  }
}


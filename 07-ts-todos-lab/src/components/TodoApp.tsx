import React, { Component } from 'react';
import './TodoApp.css';
import MOCK_TODOS from '../model/mock-todos';
import { Todo, TodoStatus } from '../model/todos';
import TodoList from './TodoList';

interface AppState {
  todos: Todo[];
  filter: TodoFilter;
}

type TodoFilter = TodoStatus | undefined;

export default class TodoApp extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    todos: MOCK_TODOS,
    filter: undefined
  }
  nextId = 0;
  constructor(props: {}) {
    super(props);
    this.state.todos.forEach(todo => todo.id = ++this.nextId);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  handleUpdateTodo(todo: Todo) {
    this.setState({todos: this.state.todos.map(td => td.id === todo.id ? todo: td)})
  }

  render() {
    return (
      <div className="TodoApp">
        <header className="TodoApp-header">
          <h1>React TODOs Demo</h1>
          <TodoList todos={this.state.todos} 
          onUpdateTodo={this.handleUpdateTodo} 
          onEditTodo={()=>{}} onDeleteTodo={()=>{}}/>
        </header>
      </div>
    );
  }
}


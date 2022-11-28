import React, { Component } from 'react';
import './TodoApp.css';
import MOCK_TODOS from '../model/mock-todos';
import { Todo, TodoStatus } from '../model/todos';
import TodoList from './TodoList';
import TodoInput from './TodoInput';

interface AppState {
  todos: Todo[];
  editedTodo: Todo | undefined; // Optuional<Todo>
  filter: TodoFilter;
}

type TodoFilter = TodoStatus | undefined;

export default class TodoApp extends Component<{}, AppState> {
  state: Readonly<AppState> = {
    todos: MOCK_TODOS,
    editedTodo: undefined,
    filter: undefined
  }
  nextId = 0;
  constructor(props: {}) {
    super(props);
    this.state.todos.forEach(todo => todo.id = ++this.nextId);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  handleUpdateTodo(todo: Todo) {
    this.setState(({ todos }) => ({ todos: todos.map(td => td.id === todo.id ? todo : td) }))
  }

  handleDeleteTodo = (todo: Todo) => {
    this.setState(({ todos }) => ({ todos: todos.filter(td => td.id !== todo.id) }))
  }

  handleTodoSubmit = (todo: Todo) => {
    if(todo.id) {// edit mode
      this.setState(({ todos }) => ({ todos: todos.map(td => td.id === todo.id ? todo : td) }))
    } else { // create mode
      this.setState(({ todos }) => ({ todos: [...todos, { ...todo, id: ++this.nextId }] }))
    }
  }

  handleTodoEdit = (todo: Todo) => {
    this.setState({ editedTodo: todo })
  }

  handleCancel = () => {
    this.setState({ editedTodo: undefined })
  }

  render() {
    return (
      <div className="TodoApp">
        <header className="TodoApp-header">
          <h1>React TODOs Demo</h1>
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo} 
          onTodoSubmit={this.handleTodoSubmit} onTodoCancel={this.handleCancel} />
          <TodoList todos={this.state.todos}
            onUpdateTodo={this.handleUpdateTodo}
            onEditTodo={this.handleTodoEdit}
            onDeleteTodo={this.handleDeleteTodo} />
        </header>
      </div>
    );
  }
}


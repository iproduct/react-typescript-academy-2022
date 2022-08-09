import React from 'react';
import './TodoApp.css';
import TodoList from './TodoList';
import MOCK_TODOS from './mock-todos';
import { Todo, TodoStatus } from './todo.model';
import TodoInput from './TodoInput';
import ChooseFilter from './ChooseFilter';

export interface TodoListener {
  (todo: Todo): void;
}

export type FilterType = TodoStatus | undefined;

export interface FilterChangeListener {
  (filter: FilterType): void;
}

export interface TodoAppState {
  todos: Todo[];
  filter: FilterType;
}

export class TodoApp extends React.Component<{}, TodoAppState> {
  state = {
    todos: MOCK_TODOS,
    filter: undefined
  };
  constructor(props: {}) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>TODO Demo</h2>
          <TodoInput onCreateTodo={this.handleCreateTodo} />
          <ChooseFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
          <TodoList
            todos={this.state.todos}
            filter={this.state.filter}
            onChangeStatus={this.handleStatusChange}
            onUpdate={this.noOpTodoListener}
            onDelete={this.handleDeleteTodo}
          />
        </header>
      </div>
    );
  }

  noOpTodoListener(todo: Todo) {}

  handleStatusChange(todo: Todo) {
    this.setState(({todos}) => ({
      todos: this.state.todos.map(td => td.id === todo.id? todo: td)
    }));
  }

  handleCreateTodo(todo: Todo) {
    this.setState(({todos}) => ({
      todos: this.state.todos.concat(todo)
    }));
  }

  handleDeleteTodo(todo: Todo) {
    this.setState(({todos}) => ({
      todos: this.state.todos.filter(td => td.id !== todo.id)
    }));
  }

  handleFilterChange = (filter: FilterType) => {
    this.setState({filter});
  }
}

export default TodoApp;

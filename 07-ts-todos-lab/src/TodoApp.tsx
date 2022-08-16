import React, { Component } from 'react';
import './App.css';
import MOCK_TODOS from './mock-todos';
import { TodosApi } from './rest-api-client';
import { Todo, TodoStatus } from './todo-model';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

export type FilterType = TodoStatus | undefined;

export interface TodoAppState {
  todos: Todo[];
  filter: FilterType;
  errors: string | undefined;
}

export default class AppClass extends Component<{}, TodoAppState> {
  state: Readonly<TodoAppState> = {
    todos: [],
    filter: undefined,
    errors: undefined
  }

  constructor(props: {}) {
    super(props);
    this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    this.handleTodoDelete = this.handleTodoDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const allTodos = await TodosApi.findAll();
      this.setState({todos: allTodos, errors: undefined});
    } catch(err) {
      this.setState({errors: (err as any).toString()})
    }
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
          {this.state.errors && <div className='errors'>{this.state.errors}</div>}
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




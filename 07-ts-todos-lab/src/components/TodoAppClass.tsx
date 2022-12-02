import React, { Component } from 'react';
import './TodoApp.css';
import { Todo, TodoCreateDTO, TodoStatus } from '../model/todos';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilter from './TodoFilter';
import { IdType } from '../shared/common-types';
import { ApiClient, ApiClientImpl } from '../service/todos-api-client';

interface AppState {
  todos: Todo[];
  errors: string | undefined;
  editedTodo: Todo | undefined; // Optuional<Todo>
  filter: FilterType;
}

export type FilterType = TodoStatus | undefined;

export type FilterChangeListener = (filterChange: FilterType) => void


export default class TodoApp extends Component<{}, AppState> {
  state: AppState = {
    todos: [],
    errors: undefined,
    editedTodo: undefined,
    filter: undefined
  }

  todosApiClient: ApiClient<IdType, Todo> = new ApiClientImpl<IdType, Todo>('todos');
  nextId = 0;

  constructor(props: {}) {
    super(props);
    this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
  }

  async componentDidMount() {
    try {
      const todos = await this.todosApiClient.findAll();
      this.setState({ todos });
    } catch (err) {
      this.setState({ errors: '' + err });
    }
  }

  async handleUpdateTodo(todo: Todo) {
    const updated = await this.todosApiClient.update(todo);
    this.setState(({ todos }) => ({
      todos: todos.map(td => td.id === updated.id ? updated : td),
      errors: undefined
    }))
  }

  handleDeleteTodo = async(todo: Todo) => {
    await this.todosApiClient.deleteById(todo.id);
    this.setState(({ todos }) => ({
      todos: todos.filter(td => td.id !== todo.id),
      errors: undefined
    }))
    this.setState(({ todos }) => ({ todos: todos.filter(td => td.id !== todo.id) }))
  }

  handleTodoSubmit = async (todo: Todo | TodoCreateDTO) => {
    try {
      if ('id' in todo) {// edit mode
        await this.handleUpdateTodo(todo);
        this.setState({editedTodo: undefined});
      } else { // create mode
        const created = await this.todosApiClient.create(todo);
        this.setState(({ todos, editedTodo }) => ({
          todos: todos.concat(created),
          editedTodo: editedTodo ? undefined : new Todo(0, '', ''),
          errors: undefined
        }))
      }
    } catch (err) {
      this.setState({ errors: '' + err });
    }
  }

  handleTodoEdit = (todo: Todo) => {
    this.setState({ editedTodo: todo })
  }

  handleCancel = () => {
    this.setState({ editedTodo: undefined })
  }

  handleFilterChange = (filter: FilterType) => {
    this.setState({ filter });
  }

  render() {
    return (
      <div className="TodoApp">
        <header className="TodoApp-header">
          <h1>React TODOs Demo</h1>
          {this.state.errors && <div className='errors'>{this.state.errors}</div>}
          <TodoInput key={this.state.editedTodo?.id} todo={this.state.editedTodo}
            onTodoSubmit={this.handleTodoSubmit} onTodoCancel={this.handleCancel} />
          <TodoFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} />
          <TodoList todos={this.state.todos} filter={this.state.filter} isLoading={false}
            onUpdateTodo={this.handleUpdateTodo}
            onEditTodo={this.handleTodoEdit}
            onDeleteTodo={this.handleDeleteTodo} />
        </header>
      </div>
    );
  }
}


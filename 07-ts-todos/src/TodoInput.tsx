import React, { Component } from 'react';
import { TodoListener } from './TodoApp';
import { Todo } from './todo.model';
import './TodoInput.css';

interface Props {
    onCreateTodo: TodoListener;
}
interface State {
    text: string;
}

export default class TodoInput extends Component<Props, State> {
    state = {
        text: ''
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleTodoSubmit}>
                <label htmlFor="todo-text">What to do next?</label>
                <input type="text" id="todo-text" name="todo-text" value={this.state.text}
                    onChange={this.handleTextChanged} placeholder="Next to do ..." />
                <button className="button button5" type="submit">Add TODO</button>
                <button className="button button3" type="reset" onClick={this.handleTodoReset}>Reset</button>
            </form>
        )
    }

    handleTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(this.state.text));
        this.setState({text: ""})
    }

    handleTodoReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        this.setState({text: ""});
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({text: event.target.value});
    }

}

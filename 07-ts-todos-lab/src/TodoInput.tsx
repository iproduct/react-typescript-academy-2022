import React, { Component } from 'react';
import { TodoListener } from './shared-types';
import { Todo } from './todo-model';
import './TodoInput.css';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: ''
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({text: event.target.value});
    }

    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(this.state.text));
        this.setState({text: ''});
    }

    handleTodoReset = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({text: ''});
    }

    render() {
        return (
            <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                <label htmlFor='TodoInput-text'>What to do next?</label>
                <input type='text' id='TodoInput-text' name='text' value={this.state.text} 
                    onChange={this.handleTextChanged} />
                <button className='button button5' type='submit'>Add TODO</button>
                <button className='button button3' type='reset' onClick={this.handleTodoReset}>Reset</button>
            </form>
        );
    }
}

export default TodoInput;
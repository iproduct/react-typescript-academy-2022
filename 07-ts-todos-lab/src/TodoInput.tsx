import React, { Component } from 'react';
import { TodoListener } from './shared-types';
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

    render() {
        return (
            <form className='TodoInput-form'>
                <label htmlFor='TodoInput-text'>What to do next?</label>
                <input type='text' id='TodoInput-text' name='text' value={this.state.text} 
                    onChange={this.handleTextChanged} />
            </form>
        );
    }
}

export default TodoInput;
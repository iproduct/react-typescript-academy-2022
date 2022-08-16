import React, { Component } from 'react';
import { TodoListener } from './shared-types';
import { Todo } from './todo-model';
import './TodoInput.css';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    text: string;
    deadline: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: '',
        deadline: ''
    }

    handleFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        this.setState({[fieldName]: event.target.value} as unknown as TodoInputState);
    }

    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(this.state.text, this.state.deadline));
        this.setState({text: '', deadline: ''});
    }

    handleTodoReset = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({text: '', deadline: ''});
    }

    render() {
        return (
            <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                <label htmlFor='TodoInput-text'>What to do next?</label>
                <input type='text' id='text' name='text' value={this.state.text} 
                    onChange={this.handleFieldChanged} />
                <input type='date' id='deadline' name='deadline' value={this.state.deadline} 
                    onChange={this.handleFieldChanged} />
                <button className='button button5' type='submit'>Add TODO</button>
                <button className='button button3' type='reset' onClick={this.handleTodoReset}>Reset</button>
            </form>
        );
    }
}

export default TodoInput;
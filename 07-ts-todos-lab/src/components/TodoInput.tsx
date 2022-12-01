import React, { Component } from 'react'
import { Todo, TodoCreateDTO, TodoStatus } from '../model/todos'
import { Optional, TodoListener } from '../shared/common-types'
import { toIsoDate } from '../shared/utils';

interface TodoInputProps {
    todo: Optional<Todo>;
    onTodoSubmit: TodoListener;
    onTodoCancel: () => void;
}

interface TodoInputState {
    text: string;
    status: string;
    deadline: string;
}

export default class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: this.props.todo?.text || '',
        status: this.props.todo?.status.toString() || '1',
        deadline: this.props.todo?.deadline || ''
    }

    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onTodoSubmit(
            this.props.todo?.id ?
            new Todo(
                this.props.todo?.id,
                this.state.text,
                toIsoDate(new Date(this.state.deadline)),
                parseInt(this.state.status),
            ) :
            new TodoCreateDTO(
                this.state.text,
                toIsoDate(new Date(this.state.deadline)),
                parseInt(this.state.status),
            )
        );
        this.setState({
            text: '',
            status: '1',
            deadline: ''
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value } as unknown as TodoInputState);
    }

    handleReset = () => {
        this.setState({
            text: this.props.todo?.text || '',
            status: this.props.todo?.status.toString() || '1',
            deadline: this.props.todo?.deadline || ''
        });
    }

    render() {
        return (
            <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                <label htmlFor='id'>ID</label>
                <input type='text' id='id' name='id' defaultValue={this.props.todo?.id || ''} disabled />
                <label htmlFor='text'>What to do next?</label>
                <input type='text' id='text' name='text' value={this.state.text}
                    onChange={this.handleChange} />
                <label htmlFor='status'>Status</label>
                <select id='status' name='status' value={this.state.status} onChange={this.handleChange}>
                    <option value={TodoStatus.Active}>Active</option>
                    <option value={TodoStatus.Completed}>Compled</option>
                    <option value={TodoStatus.Canceled}>Canceled</option>
                </select>
                <label htmlFor='deadline'>What's the deadline?</label>
                <input type='date' id='deadline' name='deadline' value={this.state.deadline}
                    onChange={this.handleChange} />
                <button className='button button5' type='submit'>Submit</button>
                <button className='button button3' type='button'  onClick={this.handleReset}>Reset</button>
                <button className='button button3' type='button' onClick={this.props.onTodoCancel}>Cancel</button>
            </form>
        )
    }
}

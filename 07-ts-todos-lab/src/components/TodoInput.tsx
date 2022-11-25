import React, { Component } from 'react'
import { Todo, TodoStatus } from '../model/todos'
import { Optional, TodoListener } from '../shared/common-types'
import { toIsoDate } from '../shared/utils';

interface TodoInputProps {
    todo: Optional<Todo>;
    onTodoSubmit: TodoListener;
}

interface TodoInputState {
    text: string;
    status: string;
    deadline: string;
}

export default class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        text: this.props.todo?.text || '',
        status: this.props.todo?.status.toString() || '',
        deadline: this.props.todo?.deadline || ''
    }

    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onTodoSubmit(
            new Todo(
                this.state.text,
                toIsoDate(new Date(this.state.deadline)),
                parseInt(this.state.status),
                this.props.todo?.id
            )
        );
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value } as unknown as TodoInputState);
    }

    render() {
        return (
            <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                <label htmlFor='id'>ID</label>
                <input type='text' id='id' name='id' defaultValue={this.props.todo?.id || ''} disabled />
                <label htmlFor='text'>What to do next?</label>
                <input type='text' id='text' name='text' value={this.state.text}
                    onChange={this.handleChange} />
                <label htmlFor='text'>Status</label>
                <select value={this.state.status} onChange={this.handleChange}>
                    <option value={TodoStatus.Active}>Active</option>
                    <option value={TodoStatus.Completed}>Compled</option>
                    <option value={TodoStatus.Canceled}>Canceled</option>
                </select>
                <label htmlFor='deadline'>What's the deadline?</label>
                <input type='date' id='deadline' name='deadline' value={this.state.deadline}
                    onChange={this.handleChange} />
            </form>
        )
    }
}

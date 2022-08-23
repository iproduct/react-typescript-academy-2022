import React, { Children, Component, Fragment, ReactNode, ReactElement } from 'react';
import { IdType, Optional, TodoListener } from './shared-types';
import { Todo, TodoStatus } from './todo-model';
import './TodoInput.css';

interface TodoInputProps {
    todo: Optional<Todo>;
    children: ReactNode;
    onSubmitTodo: TodoListener;
}

interface TodoInputState {
    id: string;
    text: string;
    status: string,
    deadline: string;
}

type IdToLabelMap = {
    [Prop in keyof TodoInputState]?: ReactElement
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        id: this.props.todo?.id?.toString() || '',
        text: this.props.todo?.text || '',
        status: this.props.todo?.status.toString() || TodoStatus.Active.toString(),
        deadline: this.props.todo?.deadline || ''
    }

    handleFieldChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = event.target.name;
        this.setState({ [fieldName]: event.target.value } as unknown as TodoInputState);
    }

    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onSubmitTodo(
            new Todo(
                this.state.text,
                this.state.deadline,
                parseInt(this.state.status),
                this.state.id ? parseInt(this.state.id) : undefined
            ));
        this.setState({ text: '', deadline: '', id: '' });
    }

    handleTodoReset = (event: React.FormEvent) => {
        event.preventDefault();
        this.setState({ text: '', deadline: '', id: '' });
    }

    render() {
        const children = Children.toArray(this.props.children);
        console.log(children);
        const labels = children.filter(child => typeof child === 'object' && 'type' in child && child.type === 'label');
        const idToLabelMap: IdToLabelMap = {};
        labels.forEach(label => {
            const labelElem = label as ReactElement<{htmlFor: string}>;
            idToLabelMap[labelElem.props.htmlFor as keyof TodoInputState] = labelElem;
        });
        console.log(idToLabelMap);
        return (
            <Fragment>
            {this.props.children}
            <div>Children Count: {Children.count(this.props.children)}</div>
            <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                <label htmlFor='id'>ID</label>
                <input type='text' id='id' name='id' defaultValue={this.state.id} disabled />

                <label htmlFor='text'>What to do next?</label>
                <input type='text' id='text' name='text' value={this.state.text}
                    onChange={this.handleFieldChanged} />

                <label htmlFor='status'>What to do next?</label>
                <select id="status" name="status" value={this.state.status} onChange={this.handleFieldChanged}>
                    <option value={TodoStatus.Active}>Active</option>
                    <option value={TodoStatus.Completed}>Completed</option>
                    <option value={TodoStatus.Canceled}>Canceled</option>
                </select>

                <label htmlFor='deadline'>What's the deadline?</label>
                <input type='date' id='deadline' name='deadline' value={this.state.deadline}
                    onChange={this.handleFieldChanged} />

                <button className='button button5' type='submit'>Submit</button>
                <button className='button button3' type='reset' onClick={this.handleTodoReset}>Reset</button>
            </form>
            </Fragment>
        );
    }
}

export default TodoInput;
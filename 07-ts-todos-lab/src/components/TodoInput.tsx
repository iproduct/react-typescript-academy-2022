import React, { Children, Component, Fragment, PropsWithChildren, ReactElement } from 'react'
import { Todo, TodoCreateDTO, TodoStatus } from '../model/todos'
import { Optional, TodoListener } from '../shared/common-types'
import { toIsoDate } from '../shared/utils';

interface TodoInputProps {
    todo: Optional<Todo>;
    onTodoSubmit: TodoListener;
    onTodoCancel: () => void;
    // children?: ReactNode;
}

interface TodoInputState {
    text: string;
    status: string;
    deadline: string;
}

type IdToLabelMap = {
    [Prop in keyof Todo]?: ReactElement
}

export default class TodoInput extends Component<PropsWithChildren<TodoInputProps>, TodoInputState> {
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
                <form className='TodoInput' onSubmit={this.handleTodoSubmit}>
                    {/* <label htmlFor='id'>ID</label> */}
                    {idToLabelMap.id}
                    <input type='text' id='id' name='id' defaultValue={this.props.todo?.id || ''} disabled />
                    {/* <label htmlFor='text'>Todo Text</label> */}
                    {idToLabelMap.text}
                    <input type='text' id='text' name='text' value={this.state.text}
                        onChange={this.handleChange} />
                    {/* <label htmlFor='status'>Status</label> */}
                    {idToLabelMap.status}
                    <select id='status' name='status' value={this.state.status} onChange={this.handleChange}>
                        <option value={TodoStatus.Active}>Active</option>
                        <option value={TodoStatus.Completed}>Compled</option>
                        <option value={TodoStatus.Canceled}>Canceled</option>
                    </select>
                    {/* <label htmlFor='deadline'>What's the deadline?</label> */}
                    {idToLabelMap.deadline}
                    <input type='date' id='deadline' name='deadline' value={this.state.deadline}
                        onChange={this.handleChange} />
                    <button className='button button5' type='submit'>Submit</button>
                    <button className='button button3' type='button' onClick={this.handleReset}>Reset</button>
                    <button className='button button3' type='button' onClick={this.props.onTodoCancel}>Cancel</button>
                </form>
            </Fragment>
        )
    }
}

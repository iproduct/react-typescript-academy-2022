import React from 'react';
import { Todo, TodoStatus } from './todo-model';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className='TodoItem-id'>{todo.id}</span>
                : {todo.text}
            </span>
            <span className='TodoItem-right'>
                {TodoStatus[todo.status]}
            </span>
        </div>
    )
}

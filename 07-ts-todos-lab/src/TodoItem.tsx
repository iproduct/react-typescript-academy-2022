import React from 'react';
import { Todo, TodoStatus } from './todo-model';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem = ({todo}: TodoItemProps) => {
    return (
        <div className='TodoItem'>
            {todo.id}: {todo.text} - {TodoStatus[todo.status]}
        </div>
    )
}

import React from 'react';
import { Todo, TodoStatus } from '../model/todos';
import { TodoUdateListener } from '../shared/common-types';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdateTodo: TodoUdateListener;
    onEditTodo: TodoUdateListener;
    onDeleteTodo: TodoUdateListener;
}

export default function TodoItem({ todo, onUpdateTodo, onEditTodo, onDeleteTodo }: TodoItemProps) {
    function handleCompletion(event: React.MouseEvent) {
        onUpdateTodo({ ...todo, status: TodoStatus.Completed })
    }

    function handleDelete(event: React.MouseEvent) {
        onDeleteTodo(todo);
    }

    return (
        <div className='TodoItem'>
            <span className='TodoItem-text'>
                <span className='TodoItem-id'>{todo.id}</span>
                : {todo.text} [{todo.deadline}]
            </span>
            <span className='TodoItem-right'>
                <span className='TodoItem-status'>{TodoStatus[todo.status]}</span>
                {todo.status === TodoStatus.Active ?
                    <span className='TodoItem-button fas fa-circle-check' onClick={handleCompletion} />
                    : <span className='TodoItem-button fas fa-times-circle danger' onClick={handleDelete} />
                }
                <span className='TodoItem-button fas fa-pen-to-square' onClick={() => onEditTodo(todo)} />
            </span>
        </div>
    );
}

import React from 'react';
import { TodoListener } from './shared-types';
import { Todo, TodoStatus } from './todo-model';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdateTodo: TodoListener;
    onDeleteTodo: TodoListener;
    onEditTodo: TodoListener;
}

export const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo, onEditTodo }: TodoItemProps) => {
    function handleCompletion(event: React.MouseEvent) {
        onUpdateTodo({ ...todo, status: TodoStatus.Completed });
    }
    function handleDelete(event: React.MouseEvent) {
        onDeleteTodo(todo);
    }
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className='TodoItem-id'>{todo.id}</span>
                : {todo.text} [{new Date(todo.deadline).toDateString()}]
            </span>
            <span className='TodoItem-right'>
                <span className='TodoItem-status'>
                    {TodoStatus[todo.status]}
                </span>
                {todo.status === TodoStatus.Active ?
                    <span className='TodoItem-button fas fa-check-circle' onClick={handleCompletion} ></span>
                    :
                    <span className='TodoItem-button fas fa-times-circle danger' onClick={handleDelete}></span>
                }
                <span className='TodoItem-button fas fa-pen-to-square' onClick={() => onEditTodo(todo)} ></span>
            </span>
        </div>
    )
}

import React from 'react'
import { Todo, TodoStatus } from './todo-model';
import { FilterType } from './TodoApp';
import { TodoItem } from './TodoItem';
import './TodoList.css'

interface TodoListProps {
    todos: Todo[];
    filter: FilterType
}

export default function TodoList({ todos, filter }: TodoListProps) {
    return (
        <div className='TodoList'>
            {todos.filter(todo => !filter ? true : todo.status === filter)
                .map(todo => (<TodoItem todo={todo} key={todo.id} />))}
        </div>
    )
}

import React, { useMemo } from 'react'
import { TodoListener } from './shared-types';
import { Todo, TodoStatus } from './todo-model';
import { BiPredicate, FilterType } from './TodoApp';
import { TodoItem } from './TodoItem';
import './TodoList.css'

interface TodoListProps {
    todos: Todo[];
    filter: FilterType;
    equals: BiPredicate<TodoStatus>;
    onUpdateTodo: TodoListener;
    onDeleteTodo: TodoListener;
    onEditTodo: TodoListener;
}

function TodoList({ equals, todos, filter, ...rest }: TodoListProps) {
    const filteredTodos = useMemo(
        () => todos.filter(todo => !filter ? true : equals(todo.status, filter)),
        [todos, filter, equals]);
    console.log('Render TodoList')
    return (
        <div className='TodoList'>
            {filteredTodos.map(todo => (<TodoItem todo={todo} key={todo.id} {...rest} />))}
        </div>
    )
}

export default React.memo(TodoList);

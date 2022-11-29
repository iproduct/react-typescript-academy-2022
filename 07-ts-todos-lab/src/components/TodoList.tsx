import { useMemo } from "react";
import { Todo } from "../model/todos";
import { TodoListener } from "../shared/common-types";
import { FilterType } from "./TodoApp";
import TodoItem from "./TodoItem";
import "./TodoList.css";

type Props = { 
    todos: Todo[],
    filter: FilterType,
    onUpdateTodo: TodoListener;
    onEditTodo: TodoListener;
    onDeleteTodo: TodoListener;
}

// export const TodoList = ({ todos }: Props) => {
export const TodoList: React.FC<Props> = ({ todos, filter, ...rest }) => {
    const filteredTodos = useMemo(() => todos.filter(todo => filter ? todo.status === filter : true), [todos, filter]);// O(n) => O(1)
    return (
        <ul className="TodoList">
           {filteredTodos.map(todo => (<TodoItem key={todo.id} todo={todo} {...rest} /> ))}
        </ul>
    )
};

export default TodoList;
import { useMemo } from "react";
import { Todo } from "../model/todos";
import { TodoUdateListener } from "../shared/common-types";
import { FilterType } from "./TodoApp";
import TodoItem from "./TodoItem";
import PropTypes from 'prop-types';
import "./TodoList.css";

type PostListProps = { 
    todos: Todo[],
    filter: FilterType,
    isLoading: boolean,
    onUpdateTodo: TodoUdateListener ;
    onEditTodo: TodoUdateListener ;
    onDeleteTodo: TodoUdateListener ;
}

// export const TodoList = ({ todos }: Props) => {
export const TodoList: React.FC<Props> = ({ todos, filter, isLoading, ...rest }) => {
    const filteredTodos = useMemo(() => todos.filter(todo => filter ? todo.status === filter : true), [todos, filter]);// O(n) => O(1)
    return isLoading ?
        <div>Loadind Data ...</div> :
        <ul className="TodoList">
           {filteredTodos.map(todo => (<TodoItem key={todo.id} todo={todo} {...rest} /> ))}
        </ul>
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        deadline: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    filter: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    onUpdateTodo: PropTypes.func.isRequired,
    onEditTodo: PropTypes.func.isRequired,
    onDeleteTodo: PropTypes.func.isRequired
}

export default TodoList;
import { Todo } from "../model/todos";
import { TodoListener } from "../shared/common-types";
import TodoItem from "./TodoItem";
import "./TodoList.css";

type Props = { 
    todos: Todo[],
    onUpdateTodo: TodoListener;
    onEditTodo: TodoListener;
    onDeleteTodo: TodoListener;
}

// export const TodoList = ({ todos }: Props) => {
export const TodoList: React.FC<Props> = ({ todos, ...rest }) => {
    console.log({ todos })
    return (
        <ul className="TodoList">
           {todos.map(todo => (<TodoItem key={todo.id} todo={todo} {...rest} /> ))}
        </ul>
    )
};

export default TodoList;
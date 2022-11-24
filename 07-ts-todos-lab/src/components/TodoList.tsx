import { Todo, TodoStatus } from "../model/todos";
import "./TodoList.css";

type Props = { todos: Todo[] }

export const TodoList: React.FC<Props> = ({ todos }) => {
    console.log({ todos })
    return (
        <ul className="TodoList">
           {todos.map(todo => (<li key={todo.id}> {todo.id} : {todo.text} - {TodoStatus[todo.status]}, till: {todo.deadline}</li>))}
        </ul>
    )
};

export default TodoList;
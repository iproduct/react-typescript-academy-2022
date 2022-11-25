import { Todo } from "../model/todos";
import TodoItem from "./TodoItem";
import "./TodoList.css";

type Props = { todos: Todo[] }

// export const TodoList = ({ todos }: Props) => {
export const TodoList: React.FC<Props> = ({ todos }) => {
    console.log({ todos })
    return (
        <ul className="TodoList">
           {todos.map(todo => (<TodoItem key={todo.id} todo={todo}
           onUpdateTodo={()=>{}} onEditTodo={()=>{}} onDeleteTodo={()=>{}} /> ))}
        </ul>
    )
};

export default TodoList;
import { Todo } from "../model/todos"

type Props = { todos: Todo[] }

export const TodoList: React.FC<Props> = ({ todos }) => {
    console.log({ todos })
    return (
        <div>TodoList Component here ...</div>
    )
};

export default TodoList;
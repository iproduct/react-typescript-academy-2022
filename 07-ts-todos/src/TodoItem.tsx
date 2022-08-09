import * as React from 'react';
import { Todo, TodoStatus } from './todo.model';
import './TodoItem.css';
import { TodoListener } from './TodoApp';

interface IAppProps {
  todo: Todo;
  onChangeStatus: TodoListener;
  onUpdate: TodoListener;
  onDelete: TodoListener;
}

export const TodoItem: React.FC<IAppProps> = (props) => {
  function handleCompletion(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    // props.onChangeStatus(Object.assign({}, props.todo, {status: TodoStatus.COMPLETED}));
    props.onChangeStatus({ ...props.todo, status: TodoStatus.COMPLETED});
  }
  function handleDelete(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    props.onDelete(props.todo);
  }
  return (
    <div className="TodoItem" key={props.todo.id}>
      <span className="TodoItem-text">
        <span className="TodoItem-id">{props.todo.id}.</span>
        {props.todo.text}
      </span>
      <span className="TodoItem-right">
        <span className="TodoItem-status">
          {TodoStatus[props.todo.status]}
        </span>
        {props.todo.status === TodoStatus.ACTIVE ? 
            <span className="TodoItem-button fas fa-check-circle" onClick={handleCompletion}></span>
          : <span className="TodoItem-button danger fas fa-times-circle" onClick={handleDelete}></span>
        }
      </span>
    </div>
  );
};


import { Todo } from "./todo-model";

export interface TodoListener {
    (todo: Todo): void;
}
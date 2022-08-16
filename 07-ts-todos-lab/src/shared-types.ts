import { Todo } from "./todo-model";
import { FilterType } from "./TodoApp";

export interface TodoListener {
    (todo: Todo): void;
}

export interface FilterChangeListener {
    (filter: FilterType): void;
}
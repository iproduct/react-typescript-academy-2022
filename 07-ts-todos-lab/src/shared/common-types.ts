import { Todo } from "../model/todos";

export type IdType = number | undefined;

export interface Indetifiable {
    id: IdType;
}

export interface TodoListener {
    (todo: Todo) : void;
}
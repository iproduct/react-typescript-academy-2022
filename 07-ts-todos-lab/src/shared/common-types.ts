import { Todo } from "../model/todos";

export type IdType = number | undefined;

export interface Indetifiable {
    id: IdType;
}

export interface TodoListener {
    (todo: Todo) : void;
}

export type Partial<T> = {
    [K in keyof T]?: T[K]
}

export type Optional<T> = T | undefined;
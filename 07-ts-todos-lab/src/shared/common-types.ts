import { TodoCreateDTO } from './../model/todos';
import { Todo } from "../model/todos";

export type IdType = number;

export interface Identifiable<K> {
    id: K;
}

export interface TodoListener {
    (todo: Todo | TodoCreateDTO) : void;
}

export interface TodoUdateListener {
    (todo: Todo) : void;
}

export type Partial<T> = {
    [K in keyof T]?: T[K]
}

export type Optional<T> = T | undefined;
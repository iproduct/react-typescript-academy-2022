import { Todo } from "./todo-model";
import { FilterType } from "./TodoApp";

export interface TodoListener {
    (todo: Todo): void;
}

export interface FilterChangeListener {
    (filter: FilterType): void;
}

export interface Identifiable<K> {
    id: K;
}

export type IdType =  number | undefined;

export type Optional<V> = V | undefined

export type Partial<V> = {
    [P in keyof V]?: V[P];
};

export type Concrete<V> = {
    [P in keyof V]-?: V[P];
};

export type Mutable<V> = {
    -readonly [P in keyof V]: V[P];
};

export type Immutable<V> = {
    readonly [P in keyof V]: V[P];
};
import { Post } from "./posts";

export interface PostListener {
    (todo: Post): void;
}

export interface Identifiable<K> {
    id: K;
}

export type IdType =  number;

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
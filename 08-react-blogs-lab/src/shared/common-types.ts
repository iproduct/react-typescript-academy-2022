import { Post, PostCreateDTO } from "../model/post";


export type IdType = number;

export interface Identifiable<K> {
    id: K;
}

export interface TodoListener {
    (todo: Post | PostCreateDTO) : void;
}

export interface TodoUdateListener {
    (todo: Post) : void;
}

export type Partial<T> = {
    [K in keyof T]?: T[K]
}

export type Optional<T> = T | undefined;
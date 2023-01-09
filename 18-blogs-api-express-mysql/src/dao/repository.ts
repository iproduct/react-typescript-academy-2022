import { WithId } from "mongodb";

export type IdType = number

export interface Identifiable {
    id: IdType;
}

export interface Repository<T extends Identifiable> {
    findAll(): Promise<T[]>;
    findById(id: IdType): Promise<T>;
    create(entity: T): Promise<T>;
    update(entity: T): Promise<T>;
    deleteById(id: IdType): Promise<T>;
    count(): Promise<number>;
}

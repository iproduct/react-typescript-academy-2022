import { Identifiable } from './../shared/common-types';
import { IdType } from "../shared/common-types";
import { toIsoDate } from "../shared/utils";

export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo implements Identifiable<IdType>{
    constructor(
        public id: IdType,
        public text: string,
        public deadline: string = toIsoDate(new Date()),
        public status: TodoStatus = TodoStatus.Active
    ) { }
}


export class TodoCreateDTO implements Omit<Todo, 'id'>{
    constructor(
        public text: string,
        public deadline: string = toIsoDate(new Date()),
        public status: TodoStatus = TodoStatus.Active,
    ) { }
}



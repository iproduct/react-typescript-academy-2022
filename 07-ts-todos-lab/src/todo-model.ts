import { IdType } from "./shared-types";

export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    constructor(
        public text: string,
        public deadline: string = toIsoDate(new Date()),
        public status = TodoStatus.Active,
        public id: IdType = undefined
    ) { }
}

export function toIsoDate(date: Date) {
    return date.toISOString().split('T')[0];
}
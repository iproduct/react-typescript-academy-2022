import { IdType } from "./shared-types";

export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    id: IdType

    constructor(
        public text: string,
        public deadline: string = toIsoDate(new Date()),
        public status = TodoStatus.Active
    ) { }
}

export function toIsoDate(date: Date) {
    return date.toISOString().split('T')[0];
}
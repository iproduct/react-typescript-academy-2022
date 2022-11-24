import { IdType } from "../shared/common-types";
import { toIsoDate } from "../shared/utils";

export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    constructor(
        public text: string,
        public deadline: string = toIsoDate(new Date()),
        public status: TodoStatus = TodoStatus.Active,
        public id?: IdType
    ) {}
}


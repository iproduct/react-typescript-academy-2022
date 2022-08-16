export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;

    constructor(
        public text: string,
        public deadline: string = new Date().toISOString().split('T')[0],
        public status = TodoStatus.Active
    ) { }
}
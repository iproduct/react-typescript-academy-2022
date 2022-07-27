import { Contact, Person } from "./person";
import { IdType } from "./shared-types";

export interface User extends Person {
    password: string;
    roles: Role[]
}


export enum Role {
    AUTHOR = 1, READER, ADMIN
}

export class UserBase implements User {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[] = [Role.READER],
        public contact?: Contact
        ) {}
    
}
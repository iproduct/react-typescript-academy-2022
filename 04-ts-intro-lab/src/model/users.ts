import { IdType } from "../common-types.js";
import { Contact, Person } from "./person.js";

export interface User extends Person {
    password: string;
    roles: Role[]; // Array<Role>
    readonly salutation: string;
    toString(): string;
    // toString: () => string;
}

export enum Role {
    AUTHOR = 1, READER, ADMIN
}

export class UserBase implements User {
    id: IdType = undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[],
        public contact?: Contact | undefined
    ) {}
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
    toString(): string {
        return `ID: ${this.id}, ${this.salutation}`;
    }
}

export class Reader extends UserBase {
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [Role.READER],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString(): string {
        return `READER: ${super.toString()}`;
    }
}

export class Author extends UserBase {
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [Role.AUTHOR],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString(): string {
        return `AUTHOR: ${super.toString()}`;
    }
}

export class Admin extends UserBase {
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [Role.ADMIN],
        contact?: Contact | undefined
    ) {
        super(firstName, lastName, email, password, roles, contact);
    }
    toString(): string {
        return `ADMIN: ${super.toString()}`;
    }
}

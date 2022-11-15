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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
    contact?: Contact;
    constructor(user: User);
    constructor(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[],
        contact?: Contact | undefined
    );
    constructor(
        nameOrUser: string | User,
        lastName?: string,
        email?: string,
        password?: string,
        roles?: Role[],
        contact?: Contact | undefined
    ) {
        if (typeof nameOrUser === 'string') {
            this.firstName = nameOrUser;
            this.lastName = lastName || '';
            this.email = email || '';
            this.password = password || '';
            this.roles = roles || [];
            this.contact = contact;
        } else {
            this.id = nameOrUser.id;
            this.firstName = nameOrUser.firstName;
            this.lastName = nameOrUser.lastName;
            this.email = nameOrUser.email;
            this.password = nameOrUser.password;
            this.roles = nameOrUser.roles;
            this.contact = nameOrUser.contact;
        }
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
    toString(): string {
        return `ID: ${this.id}, Name: ${this.firstName} ${this.lastName}, Email: ${this.email}, Pasword: ${this.password}, Roles: roles: ${this.roles.map(r => Role[r]).join(', ')}`;
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

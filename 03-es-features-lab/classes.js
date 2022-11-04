class Person {
    static nextId = 0;
    static getNextId() {
        return ++Person.nextId;
    }
    id = Person.getNextId();
    constructor(fName, lName, address){
        this.fName = fName;
        this.lName = lName;
        this.address = address;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.fName} ${this.lName}, Address: ${this.address}`
    }
}

const READER = 0;
const AUTHOR = 1;
const ADMIN = 2;

const Role = ['READER', 'AUTHOR', 'ADMIN']


class User extends Person {
    constructor(fName, lName, address, username, password, role) {
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    toString() {
        return `${super.toString()}, Username: ${this.username}, Passowrd: ${this.password}, Role: ${Role[this.role]}`
    }
}

const p1 = new Person('Trayan', 'Iliev', 'Sofia 1000');
const p2 = new Person('John', 'Doe', 'London');
const p3 = new Person('Jane', 'Doe', 'New York');
[p1, p2, p3].forEach(p => console.log(p.toString()))

const u1 = new User('Trayan', 'Iliev', 'Sofia 1000', 'trayan', 'trayan123', ADMIN);
const u2 = new User('Ivan', 'Petrov', 'Plovdiv', 'ivan', 'ivan123', AUTHOR);
const u3 = new User('Petya', 'Ignatova', 'Ruse', 'petya', 'petya123', ADMIN);
[u1, u2, u3].forEach(p => console.log(p.toString()))
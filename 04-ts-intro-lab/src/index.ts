import { Admin, Author, Reader, Role, User } from './model/users.js';

// function greeter(person: string) {
//     return `Hi ${person} from TypeScript!`
// }

const users: User[] = [
    new Admin('Default', 'Admin', 'admin@mycompany.com', 'admin123', [Role.READER, Role.AUTHOR, Role.ADMIN]),
    new Author('Default', 'Author', 'author@mycompany.com', 'author123'),
    new Reader('Default', 'Reader', 'reader@mycompany.com', 'reader123'),
    new Author('John', 'Doe', 'john@gmail.com', 'john123'),
    new Admin('Jane', 'Doe', 'jane@gmail.com', 'jane123'),
];
// document.getElementById('results')!.innerHTML = greeter(user);

const resultsElem = document.getElementById('results');
if (resultsElem) {
    users.forEach(user => {
        const elem = document.createElement('div');
        elem.innerHTML = user.toString();
        resultsElem.insertAdjacentElement('beforeend', elem);
    });
}


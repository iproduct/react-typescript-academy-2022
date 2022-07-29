import { Admin, Author, Reader, User } from './model/user.js';

const users: User[] = [
    new Reader(1, 'Trayan', 'Iliev', 'trayan@gmail.com', 'trayan123', { country: 'BG', address: 'Sofia, 1000' }),
    new Author(2, 'John', 'Doe', 'john@gmail.com', 'john123', { country: 'USA', address: 'New York' }),
    new Admin(2, 'Jane', 'Doe', 'jane@gmail.com', 'jane123', { country: 'USA', address: 'San Francisko' }),
];

document.getElementById('results')!.innerHTML = users.map(user => user.toString()).join('<br>');
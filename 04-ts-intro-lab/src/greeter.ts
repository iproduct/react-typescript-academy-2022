import { Role, User, UserBase } from './users.js';

// function greeter(person: string) {
//     return `Hi ${person} from TypeScript!`
// }

const user: User = new UserBase('Default', 'Admin', 'admin@mycompany.com', 'admin123', [Role.READER, Role.AUTHOR, Role.ADMIN]);

// document.getElementById('results')!.innerHTML = greeter(user);

const resultsElem = document.getElementById('results');
if(resultsElem) {
    resultsElem.innerHTML = user.salutation;
}


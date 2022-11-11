function greeter(person: string) {
    return `Hi ${person} from TypeScript!`
}

const user: string = 'Trayan';

const resultsElem = document.getElementById('results');
if(resultsElem) {
    resultsElem.innerHTML = greeter(user);
}
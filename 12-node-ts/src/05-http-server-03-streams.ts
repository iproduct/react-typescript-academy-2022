import * as http from 'http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as oppressor from 'oppressor';

const HOSTNAME = 'localhost';
const PORT = 64000;

const todos = [
    { id: 1, text: 'Implement REST server' },
    { id: 2, text: 'Implement GET all TODOs' },
    { id: 3, text: 'Implement POST new TODO' },
    { id: 4, text: 'Implement error handling' },
];

let nextId = 4;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    var stream = fs.createReadStream(path.join(__dirname, '../public/index.html'));
    stream
    .pipe(oppressor(req))
    .pipe(res);
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})

server.on('error', err => {
    console.log('Server error:', err);
});
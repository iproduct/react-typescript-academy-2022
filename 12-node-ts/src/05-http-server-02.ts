import * as http from 'http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';

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
    const path = url.parse(req.url).pathname
    console.log(`Request for: ${path}`)
    console.log(`METHOD: ${req.method}`)
    console.log(`HEADRES: ${JSON.stringify(req.headers)}`)

    if (req.method === 'GET' && path === '/api/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos))
    } else if (req.method === 'GET') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'This is not the page you are looking for :)' }))
    } else if (req.method === 'POST') {
        let bodyChunks: Uint8Array[] = [];

        req.on('data', chunk => bodyChunks.push(chunk))
            .on('end', async () => {
                let body = Buffer.concat(bodyChunks).toString();
                console.log(body);
                const newTodo = JSON.parse(body);
                newTodo.id = ++nextId;
                todos.push(newTodo);
                fs.writeFile('todos.json', JSON.stringify(todos), (err)=>{
                    if(err) {
                        console.log(err);
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: 'Error writing to JSON file :(' }))
                        return;
                    }
                    res.writeHead(201, {
                        'Content-Type': 'application/json',
                        'Location': `http://${HOSTNAME}:${PORT}/api/todos/${newTodo.id}`
                    });
                    res.end(JSON.stringify(newTodo));
                })
            })
    }
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})

server.on('error', err => {
    console.log('Server error:', err);
});
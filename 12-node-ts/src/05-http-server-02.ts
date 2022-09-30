import * as http from 'http';
import * as url from 'url';
import { IncomingMessage, ServerResponse } from 'http';

const HOSTNAME = 'localhost';
const PORT = 64000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const path = url.parse(req.url).pathname
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello NodeJS</h1>')
    res.write('<h2>from TypeScript</h2>')
    res.write(`<p>Request for: ${path}</p>`)
    res.write(`<p>METHOD: ${req.method}</p>`)
    res.end(`<p>HEADRES: ${JSON.stringify(req.headers)}</p>`)
})

server.listen(PORT, HOSTNAME, () => {
    console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
})

server.on('error', err => {
    console.log('Server error:', err);
});
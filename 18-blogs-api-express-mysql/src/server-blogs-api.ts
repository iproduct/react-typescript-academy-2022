
import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { MongoClient} from 'mongodb';
import * as mysql from 'mysql';
import { sendErrorResponse } from './utils';
import postsRouter from './routes/posts-router';
import { Post } from './model/post';
import { User } from './model/user';
import { UsersRepository } from './dao/users-repository';
import authRouter from './routes/auth-router';
import { AuthenticationError, ForbiddenError, InvalidDataError, NotFoundError } from './model/errors';
import {config} from 'dotenv';
import usersRouter from './routes/users-router';
import { PostsRepository } from './dao/posts-repository';
config();

export const HOSTNAME = 'localhost';
export const PORT = 4000;
const POSTS_DB_FILE = 'posts.json';
const dbUrl = `mongodb://localhost:27017`;
const database = 'ts-academy-2022';
const postsCollection = 'posts';
const usersCollection = 'users';

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE'
}))
app.use(logger('dev'))
app.use(express.json({ limit: '10mb' }))

app
    .use('/api/posts', postsRouter)
    .use('/api/auth', authRouter)
    .use('/api/users', usersRouter)
    .use((req, res) => {
        sendErrorResponse(req, res, 404, `This is not the page you are looking for :)`);
    });

app.use(function (err, req, res, next) {
    console.error(err.stack);
    let status = 500;
    if(err instanceof AuthenticationError) {
        status = 401;
    } else if(err instanceof ForbiddenError) {
        status = 403;
    } else if(err instanceof NotFoundError) {
        status = 404;
    } else if(err instanceof InvalidDataError) {
        status = 400;
    } 
    sendErrorResponse(req, res, err.status || status, `Error: ${err.message}`, err);
});

(async () => {
    const pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        port: 3306,
        user: 'trayan',
        password: 'trayan',
        database: 'fullstack_react_2022'
      });
    app.set("postsRepo", new PostsRepository(pool));
    app.set("usersRepo", new UsersRepository(pool));

    app.listen(PORT, HOSTNAME, () => {
        console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
    })
})(); //IIFE

app.on('error', err => {
    console.log('Server error:', err);
});

import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'morgan';
import { MongoClient, ObjectId } from 'mongodb';
import { sendErrorResponse } from './utils';
import postsRouter from './routes/posts-router';
import { MongodbRepository } from './dao/mongodb-repository';
import { Post } from './model/post';
import { User } from './model/user';
import { UserRepository } from './dao/user-repository';
import authRouter from './routes/auth-router';
import { AuthenticationError, ForbiddenError, InvalidDataError, NotFoundError } from './model/errors';
import {config} from 'dotenv';
import usersRouter from './routes/users-router';
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
    methods: 'GET,POST'
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
    const con = await MongoClient.connect(dbUrl);
    const db = con.db(database);
    app.locals.postsRepo = new MongodbRepository<Post>(db, postsCollection);
    app.locals.usersRepo = new UserRepository(db, usersCollection);

    app.listen(PORT, HOSTNAME, () => {
        console.log(`HTTP Server listening on: http://${HOSTNAME}:${PORT}`);
    })
})(); //IIFE

app.on('error', err => {
    console.log('Server error:', err);
});
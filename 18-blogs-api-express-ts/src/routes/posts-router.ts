import { InvalidDataError, NotFoundError } from './../model/errors';
import { Repository } from './../dao/repository';
import { HOSTNAME, PORT } from '../server-blogs-api';
import * as express from 'express';
import { replaceWithId, sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Post } from '../model/post';
import verifyToken from '../security/verify-token';
import verifyRole from '../security/verify-role';
import { ObjectId } from 'mongodb';
import { Role } from '../model/user';


const router = express.Router();

// Posts API Feature
router.get('/', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    try {
        const posts = await postsRepo.findAll();
        res.json(posts);
    } catch (err) {
        console.error(`Unable to find posts.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const post = await postsRepo.findById(params.id);
        res.json(post);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find post: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post('/', async function (req, res) {
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            // id: 'required|regex:^[0-9a-f]{24}',
            title: 'required|string|min:3|max:60',
            text: 'string|max:120',
            authorId: 'required|regex:^[0-9a-f]{24}$',
            content: 'string',
            imageUrl: 'url',
            categories: 'array',
            'categories.*': 'string',
            keywords: 'array',
            'keywords.*': 'string'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    try {
        const created = await postsRepo.create(post);
        res.status(201).location(`http://${HOSTNAME}:${PORT}/api/posts/${created.id}`).json(created);
    } catch (error) {
        console.error(`Unable to create post: ${post.id}: ${post.title}.`);
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});

router.put('/:id', verifyToken, verifyRole([Role.AUTHOR, Role.ADMIN]), async (req, res) => {
    const post = req.body;
    if (req.params.id !== post.id) {
        sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${req.params.id}`);
        return;
    }
    try {
        await indicative.validator.validate(post, {
            id: 'required|regex:^[0-9a-f]{24}',
            title: 'required|string|min:3|max:60',
            text: 'string|max:120',
            authorId: 'required|regex:^[0-9a-f]{24}',
            content: 'string',
            imageUrl: 'url',
            categories: 'array',
            'categories.*': 'string',
            keywords: 'array',
            'keywords.*': 'string'
        });
        const updated = await req.app.locals.postsRepo.update(post);
        res.json(updated);
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

router.delete('/:id', async (req, res, next) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        console.log(errors);
        next(new InvalidDataError(`Invalid post data: ${errors.map(e => e.message).join(', ')}`));
        return;
    }
    const postsRepo: Repository<Post> = req.app.locals.postsRepo;
    try {
        return res.json(await postsRepo.deleteById(req.params.id));
    } catch (err) {
        next(err);
    }
});

export default router;
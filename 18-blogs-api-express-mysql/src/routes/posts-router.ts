import { NotFoundError } from './../model/errors';
import { Repository } from './../dao/repository';
import { HOSTNAME, PORT } from '../server-blogs-api';
import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Post } from '../model/post';
import verifyToken from '../security/verify-token';
import verifyRole from '../security/verify-role';
import { ObjectId } from 'mongodb';


const router = express.Router();

// Posts API Feature
router.get('/', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.get("postsRepo");
    try {
        const posts = await postsRepo.findAll();
        res.json(posts);
    } catch (err) {
        console.error(`Unable to find posts.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const postsRepo: Repository<Post> = req.app.get("postsRepo");
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|integer|above:1' });
    } catch (errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const post = await postsRepo.findById(+params.id);
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
    const postsRepo: Repository<Post> = req.app.get("postsRepo");
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            // id: 'required|integer|above:1',
            title: 'required|string|min:3|max:80',
            content: 'string|max:1024',
            authorId: 'required|integer|min:1',
            imageUrl: 'url',
            tags: 'required|array',
            'tags.*': 'string|regex:\\w+',
            categories: 'required|array',
            'categories.*': 'string',
            created: 'date',
            modified: 'date'
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

router.put('/:id', /*verifyToken, verifyRole(['Author','Admin']),*/ async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|integer|above:1' });
    } catch (errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    const postsRepo: Repository<Post> = req.app.get("postsRepo");
    try {
        const old = await postsRepo.findById(+req.params.id);
        const post = req.body;
        if (old.id !== +post.id) {
            sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${req.params.id}`);
            return;
        }
        try {
            await indicative.validator.validate(post, {
                id: 'required|integer|above:1',
                title: 'required|string|min:3|max:80',
                content: 'string|max:1024',
                authorId: 'required|integer|min:1',
                imageUrl: 'url',
                tags: 'required|array',
                'tags.*': 'string|regex:\\w+',
                categories: 'required|array',
                'categories.*': 'string',
                created: 'date',
                modified: 'date'
            });
        } catch (errors) {
            sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
            return;
        }
        try {
            const updated = await postsRepo.update(post);
            res.json(updated);
        } catch (err) {
            console.log(`Unable to update post: ${post.id}: ${post.title}`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch (errors) {
        console.log(errors);
        sendErrorResponse(req, res, 404, `Post with ID=${params.id} does not exist`);
        return;
    }
});

router.delete('/:id', async (req, res) => {
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|integer|above:1' });
    } catch (errors) {
        console.log(errors);
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    const postsRepo: Repository<Post> = req.app.get("postsRepo");
    return res.json(await postsRepo.deleteById(+req.params.id));
});

export default router;
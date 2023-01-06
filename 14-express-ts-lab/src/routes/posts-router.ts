import * as express from 'express';
import { Request, Response, Router } from 'express';
import { Repository } from '../dao/repository';
import { Post } from '../model/post';

const router = Router();

// Posts API Feature
router.get('/', async (req, res) => {
    const repo = req.app.get('postsRepo') as Repository<Post>;
    res.json(await repo.findAll());
}).get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    const repo = req.app.get('postsRepo') as Repository<Post>;
    try {
        const post = await repo.findById(postId);
        res.json(post);
    } catch (err) {
        next({status: 404, message: err.message});
    }
});

export default router;
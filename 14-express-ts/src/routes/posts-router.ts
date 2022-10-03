import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const postsDb = 'posts.json';

// Posts API Feature
router.get('/', async (req, res) => {
    try {
        const postsData = await promises.readFile(postsDb)
        const posts = JSON.parse(postsData.toString());
        res.json(posts);
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});
// router.get('/:id', async (req, res) => {
//     const params = req.params;
//     try {
//         await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
//         const post = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
//         if (!post) {
//             sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
//             return;
//         }
//         res.json(post);
//     } catch (errors) {
//         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
//     }
// });

router.post('/', async function (req, res) {
    const post = req.body;
    try {
        await indicative.validator.validate(post, {
            // id: 'required|regex:^[0-9a-f]{24}',
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
        const postsData = await promises.readFile(postsDb)
        const posts = JSON.parse(postsData.toString());
        post.id = uuidv4();
        posts.push(post);
        try {
        promises.writeFile(postsDb, JSON.stringify(posts));
        res.json(post);
        } catch(err) {
            console.error(`Unable to create post: ${post.id}: ${post.title}.`);
            console.error(err);
            sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
        }
    } catch(errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

// router.put('/:id', verifyToken, verifyRole(['Author','Admin']), async (req, res) => {
//     const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
//     if (!old) {
//         sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
//         return;
//     }
//     const post = req.body;
//     if (old._id.toString() !== post.id) {
//         sendErrorResponse(req, res, 400, `Post ID=${post.id} does not match URL ID=${req.params.id}`);
//         return;
//     }
//     try {
//         await indicative.validator.validate(post, {
//             id: 'required|regex:^[0-9a-f]{24}',
//             title: 'required|string|min:3|max:60',
//             text: 'string|max:120',
//             authorId: 'required|regex:^[0-9a-f]{24}',
//             content: 'string',
//             imageUrl: 'url',
//             categories: 'array',
//             'categories.*': 'string',
//             keywords: 'array',
//             'keywords.*': 'string'
//         });
//         try {
//             r = await req.app.locals.db.collection('posts').updateOne({ _id: new ObjectID(req.params.id) }, { $set: post });
//             if (r.result.ok) {
//                 console.log(`Updated post: ${JSON.stringify(post)}`);
//                 if (r.modifiedCount === 0) {
//                     console.log(`The old and the new posts are the same.`);
//                 }
//                 res.json(post);
//             } else {
//                 sendErrorResponse(req, res, 500, `Unable to update post: ${post.id}: ${post.title}`);
//             }
//         } catch (err) {
//             console.log(`Unable to update post: ${post.id}: ${post.title}`);
//             console.error(err);
//             sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
//         }
//     } catch (errors) {
//         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     const params = req.params;
//     try {
//         await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
//         const old = await req.app.locals.db.collection('posts').findOne({ _id: new ObjectID(req.params.id) });
//         if (!old) {
//             sendErrorResponse(req, res, 404, `Post with ID=${req.params.id} does not exist`);
//             return;
//         }
//         replace_id(old)
//         const r = await req.app.locals.db.collection('posts').deleteOne({ _id: new ObjectID(req.params.id) });
//         if(r.result.ok && r.deletedCount === 1) {
//             console.log(`Deleted post: ${old.id}: ${old.title}`);
//             res.json(old);
//         } else {
//             console.log(`Unable to delete post: ${post.id}: ${post.title}`);
//             sendErrorResponse(req, res, 500, `Unable to delete post: ${old.id}: ${old.title}`);
//         }
//     } catch (errors) {
//         sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
//     }
// });

export default router;
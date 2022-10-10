import { InvalidDataError, NotFoundError } from '../model/errors';
import { Repository } from '../dao/repository';
import { HOSTNAME, PORT } from '../server-blogs-api';
import * as express from 'express';
import { sendErrorResponse } from '../utils';
import * as indicative from 'indicative';
import { Role, User } from '../model/user';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../dao/user-repository';
import { nextTick } from 'process';
import verifyToken from '../security/verify-token';


const router = express.Router();

// Users API Feature
router.get('/', async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    try {
        const users = await usersRepo.findAll();
        res.json(users);
    } catch (err) {
        console.error(`Unable to find users.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

router.get('/:id', async (req, res) => {
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const params = req.params;
    try {
        await indicative.validator.validate(params,
            { id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const user = await usersRepo.findById(params.id);
        res.json(user);
    } catch (error) {
        if (error instanceof NotFoundError) {
            sendErrorResponse(req, res, 404, error.message, error);
        } else {
            console.error(`Unable to find user: ${params.id}.`);
            sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
        }
    }
});

router.post('/', async function (req, res, next) {
    const usersRepo: UserRepository = req.app.locals.usersRepo;
    const user = req.body;

    try {
        await indicative.validator.validate(user, {
            // id: 'required|regex:^[0-9a-f]{24}',
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|string|min:5',
            password: 'required|string|min:6',
            role: `required|integer|range:${Role.READER},${Role.ADMIN}`,
            imageUrl: 'url'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    // create user in db
    try {
        const found = await usersRepo.findByUsername(user.username);
        if (found) {
            // sendErrorResponse(req, res, 400, `Username already taken: ${newUser.username}.`);
            next(new InvalidDataError(`Username already taken: "${user.username}"`));
            return;
        }

        // hash password
        user.password = await bcrypt.hash(user.password, 8);

        // Create new User
        const created = await usersRepo.create(user);
        delete created.password;

        res.status(201).location(`/api/users/${created.id}`).json(created);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async function (req, res) {
    const id = req.params.id;
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    const user = req.body;

    // const old = await req.app.locals.db.collection('users').findOne({ _id: new ObjectId(id) });
    // if (!old) {
    //     sendErrorResponse(req, res, 404, `User with ID=${id} does not exist`);
    //     return;
    // }
    if (id !== user.id) {
        sendErrorResponse(req, res, 400, `User ID=${user.id} does not match URL ID=${id}`);
        return;
    }

    try {
        await indicative.validator.validate(user, {
            id: 'required|regex:^[0-9a-f]{24}$',
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|string|min:5',
            role: `required|integer|range:${Role.READER},${Role.ADMIN}`,
            imageUrl: 'url'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }

    if (user.password) {
        delete user.password;
    }

    try {
        const updated = await usersRepo.update(user);
        res.json(updated);
    } catch (error) {
        console.error(`Unable to update user: ${user.id}: ${user.title}.`);
        sendErrorResponse(req, res, 500, `Server error: ${error.message}`, error);
    }
});


router.delete('/:id', verifyToken, async(req, res, next) => {
    const params = req.params;
    const usersRepo: Repository<User> = req.app.locals.usersRepo;
    try {
        await indicative.validator.validate(params, { id: 'required|regex:^[0-9a-f]{24}$' });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const deleted = await usersRepo.deleteById(params.id);
        res.json(deleted);
    } catch (error) {
        next(error);
    }
});

export default router;

/**
 * THIS HEADER SHOULD BE KEPT INTACT IN ALL CODE DERIVATIVES AND MODIFICATIONS.
 * 
 * This file provided by IPT is for non-commercial testing and evaluation
 * purposes only. IPT reserves all rights not expressly granted.
 *  
 * The security implementation provided is DEMO only and is NOT intended for production purposes.
 * It is exclusively your responsisbility to seek advice from security professionals 
 * in order to secure the REST API implementation properly.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Router } from 'express';
import { AuthenticationError, InvalidDataError } from './../model/errors';
import * as indicative from 'indicative';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Role, User } from '../model/user';
import Credentials from '../model/auth';
import { Repository } from '../dao/repository';
import { UsersRepository } from '../dao/users-repository';
import { sendErrorResponse } from '../utils';

const router = Router();

// Auth API Feature
router.post('/login', async (req, res, next) => {
    const usersRepo: UsersRepository = req.app.locals.usersRepo;
    const credentials = req.body as Credentials;
    try {
        await indicative.validator.validate(credentials, {
            username: 'required',
            password: 'required|string|min:6'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    try {
        const user = await usersRepo.findByUsername(credentials.username);
        if (!user) {
            next(new AuthenticationError(`Username or password is incorrect.`));
            return;
        }
        const passIsValid = await bcrypt.compare(credentials.password, user.password);
        if (!passIsValid) {
            next(new AuthenticationError(`Username or password is incorrect.`));
            return;
        }
        console.log(process.env.BLOGS_API_SECRET);
        const token = jwt.sign({ id: user.id }, process.env.BLOGS_API_SECRET, {
            expiresIn: '1h' //expires in 1h
        });
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        next(err);
    }

});

router.post('/register', async (req, res, next) => {
    const usersRepo: UsersRepository = req.app.locals.usersRepo;
    // validate new user
    const newUser = req.body;
    try {
        await indicative.validator.validate(newUser, {
            firstName: 'required|string|min:2',
            lastName: 'required|string|min:2',
            username: 'required|string|min:5',
            password: 'required|string|min:6',
            role: `required|integer|equals:${Role.READER}`,
            imageUrl: 'url'
        });
    } catch (errors) {
        sendErrorResponse(req, res, 400, `Invalid post data: ${errors.map(e => e.message).join(', ')}`, errors);
        return;
    }
    // create user in db
    try {
        const found = await usersRepo.findByUsername(newUser.username);
        if (found) {
            // sendErrorResponse(req, res, 400, `Username already taken: ${newUser.username}.`);
            next(new InvalidDataError(`Username already taken: "${newUser.username}"`));
        }

        // hash password
        newUser.password = await bcrypt.hash(newUser.password, 8);
        newUser.role = Role.READER;

        // Create new User
        const created = await usersRepo.create(newUser);
        delete created.password;

        res.status(201).location(`/api/users/${created.id}`).json(created);
    } catch (err) {
        next(err);
    }
});

export default router;


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

import { OptionalId } from 'mongodb';
import { Identifiable, IdType } from '../dao/repository';

export interface IUser extends Identifiable {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    imageUrl: string;
    role: Role;
}

export enum Role{
    READER, AUTHOR, ADMIN
}

export class User implements IUser , OptionalId<User>{
    public id: IdType;
    constructor(
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public imageUrl: string,
        public role: Role = Role.READER
        ) {}
}
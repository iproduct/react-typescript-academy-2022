import { Db } from 'mongodb';
import { User } from '../model/user';
import { replaceWithId } from '../utils';
import { MongodbRepository } from './mongodb-repository';

export class UserRepository extends MongodbRepository<User> {
    constructor(protected db: Db, protected collection: string) { 
        super(db, collection);
    }
    async findByUsername(username: string): Promise<User> {
        const user = await this.db.collection<User>(this.collection).findOne({username});
        return user ? replaceWithId(user): undefined;
    }
}
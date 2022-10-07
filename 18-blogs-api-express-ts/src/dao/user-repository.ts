import { User } from '../model/user';
import { replaceWithId } from '../utils';
import { MongodbRepository } from './mongodb-repository';

export class UserRepository extends MongodbRepository<User> {
    async findByUsername(username: string): Promise<User> {
        const user = await this.db.collection<User>(this.collection).findOne({username});
        return replaceWithId(user);
    }
}
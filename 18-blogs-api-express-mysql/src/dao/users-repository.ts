import { IdType, Repository } from './repository';
import { Db } from 'mongodb';
import { User } from '../model/user';
import { Pool } from 'mysql';

export class UsersRepository implements Repository<User> {
    constructor(protected db: Pool) { }
    findAll(): Promise<User[]> {
        throw new Error('Method not implemented.');
    }
    findById(id: IdType): Promise<User> {
        throw new Error('Method not implemented.');
    }
    create(entity: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(entity: User): Promise<User> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: IdType): Promise<User> {
        throw new Error('Method not implemented.');
    }
    count(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    async findByUsername(username: string): Promise<User> {
        // const user = await this.db.collection<User>(this.collection).findOne({username});
        // return user ? replaceWithId(user): undefined;
        throw new Error('Method not implemented.');
    }
}
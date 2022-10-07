import { Post } from '../model/post';
import { Identifiable, IdType, Repository } from './repository';
import { promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../model/errors';
import { Db, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { replaceWithId, replaceWith_id } from '../utils';


export class MongodbRepository<T extends Identifiable> implements Repository<T> {
    constructor(protected db: Db, protected collection: string) { }

    async findAll(): Promise<T[]> {
        const entities = await this.db.collection<T>(this.collection).find().toArray()
        return entities.map(result => replaceWithId<T>(result));
    }

    findById(id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }

    async create(dto: T): Promise<T> {
        delete dto.id;
        const document = dto as OptionalUnlessRequiredId<T>;
        const { acknowledged, insertedId } = await this.db.collection<T>(this.collection).insertOne(document);
        if (acknowledged) {
            console.log(`Successfully inserted 1 document with ID ${insertedId}`);
        }
        return replaceWithId(document);
    }
    
    update(entity: T): Promise<T> {
        throw new Error('Method not implemented.');
    }
    deleteById(id: string): Promise<T> {
        throw new Error('Method not implemented.');
    }
    count(): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

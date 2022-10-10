import { Post } from '../model/post';
import { Identifiable, IdType, Repository } from './repository';
import { promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../model/errors';
import { Db, ObjectId, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { replaceWithId, replaceWith_id } from '../utils';


export class MongodbRepository<T extends Identifiable> implements Repository<T> {
    constructor(protected db: Db, protected collection: string) { }

    async findAll(): Promise<T[]> {
        const entities = await this.db.collection<T>(this.collection).find().toArray()
        return entities.map(result => replaceWithId<T>(result));
    }

    async findById(id: string): Promise<T> {
        const myquery = { _id: new ObjectId(id) };
        const document= await this.db.collection(this.collection).findOne<WithId<T>>(myquery);
        if(!document) {
            throw new NotFoundError(`Document with ID=${id} not found`);
        }
        return replaceWithId(document);
    }

    async create(dto: T): Promise<T> {
        delete dto.id;
        const document = dto as OptionalUnlessRequiredId<T>;
        const { acknowledged, insertedId } = await this.db.collection<T>(this.collection).insertOne(document);
        if (acknowledged) {
            console.log(`Successfully inserted 1 document with ID ${insertedId}`);
            return replaceWithId(document);
        }
        throw new Error(`Error creating new document in MongoDB`)
    }

    async update(dto: T): Promise<T> {
        const document = replaceWith_id(dto) as OptionalUnlessRequiredId<T>;
        const myquery = { _id: new ObjectId(document._id) };
        const updateRes = await this.db.collection(this.collection)
            .replaceOne(myquery, document);
        if (!updateRes.acknowledged) {
            throw new Error(`Error updating document in MongoDB`)
        }
        if (updateRes.modifiedCount < 1) {
            throw new NotFoundError(`Entity with ID=${dto.id} does not exist`);
        }
        console.log(`Successfully updated 1 document with ID ${document._id}`);
        return replaceWithId(document);
    }

    async deleteById(id: string): Promise<T> {
        const myquery = { _id: new ObjectId(id) };
        const deleted= await this.db.collection(this.collection).findOneAndDelete(myquery);
        console.log(deleted);
        if (!deleted.ok) {
            throw new Error(`Error deleting document in MongoDB`)
        }
        if(deleted.lastErrorObject.n === 0) {
            throw new NotFoundError(`Entity with ID=${id} does not exist`);
        }
        return replaceWithId(deleted.value as WithId<T>);
    }

    async count(): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

import { Post } from '../model/post';
import { Identifiable, IdType, Repository } from './repository';
import { promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../model/errors';
import { Db, ObjectId, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { Pool } from 'mysql';


export class PostsRepository implements Repository<Post> {
    constructor(protected pool: Pool) { }

    async findAll(): Promise<Post[]> {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM posts', (err, rows, fields) => {
                if (err) throw reject(err);
                resolve(rows);
            });
        });
    }

    async findById(id: IdType): Promise<Post> {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM posts WHERE id=?', [id], (err, rows, fields) => {
                if (err) throw reject(err);
                if (rows.length == 1) {
                    const post = rows[0] as Post;
                    console.log('Found post:', post);
                    resolve(post);
                } else {
                    reject(new Error(`Error finding new document in database`));
                }
            });
        });
    }

    async create(dto: Post): Promise < Post > {
                // delete dto.id;
                // const document = dto as OptionalUnlessRequiredId<T>;
                // const { acknowledged, insertedId } = await this.db.collection<T>(this.collection).insertOne(document);
                // if (acknowledged) {
                //     console.log(`Successfully inserted 1 document with ID ${insertedId}`);
                //     return replaceWithId(document);
                // }
                // throw new Error(`Error creating new document in MongoDB`)
                throw new Error('Method not implemented.');
            }

    async update(dto: Post): Promise < Post > {
                // const document = replaceWith_id(dto) as OptionalUnlessRequiredId<T>;
                // const myquery = { _id: new ObjectId(document._id) };
                // const updateRes = await this.db.collection(this.collection)
                //     .replaceOne(myquery, document);
                // if (!updateRes.acknowledged) {
                //     throw new Error(`Error updating document in MongoDB`)
                // }
                // if (updateRes.modifiedCount < 1) {
                //     throw new NotFoundError(`Entity with ID=${dto.id} does not exist`);
                // }
                // console.log(`Successfully updated 1 document with ID ${document._id}`);
                // return replaceWithId(document);
                throw new Error('Method not implemented.');
            }

    async deleteById(id: IdType): Promise < Post > {
                // const myquery = { _id: new ObjectId(id) };
                // const deleted= await this.db.collection(this.collection).findOneAndDelete(myquery);
                // console.log(deleted);
                // if (!deleted.ok) {
                //     throw new Error(`Error deleting document in MongoDB`)
                // }
                // if(deleted.lastErrorObject.n === 0) {
                //     throw new NotFoundError(`Entity with ID=${id} does not exist`);
                // }
                // return replaceWithId(deleted.value as WithId<T>);
                throw new Error('Method not implemented.');
            }

    async count(): Promise < number > {
                throw new Error('Method not implemented.');
            }
        }

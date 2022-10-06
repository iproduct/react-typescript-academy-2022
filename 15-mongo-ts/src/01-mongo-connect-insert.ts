import { MongoClient } from "mongodb";
import { Post } from "./model/post";

const dbUrl = `mongodb://localhost:27017`;
const database = 'ts-academy-2022';

MongoClient.connect(dbUrl).then(async (con) => {
    const db = con.db(database);
    const posts = await db.collection<Post>('posts').find().toArray();
    console.log(posts);
});
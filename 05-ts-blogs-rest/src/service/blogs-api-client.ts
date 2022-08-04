import { IdType } from './../shared-types';
import { Post, PostCreateDto } from "../model/posts.js";

export interface BlogsApiClient {
    getAllPosts(): Promise<Post[]>;
    getPostById(id: IdType): Promise<Post>;
    addNewPost(post: PostCreateDto): Promise<Post>;
    updatePost(post: Post): Promise<Post>;
    deletePostById(id: IdType): Promise<Post>;
}
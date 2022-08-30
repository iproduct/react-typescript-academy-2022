import { IdType } from "./shared-types.js";

export enum PostStatus {
    Published = 1, Draft
}

export type FilterType = PostStatus | undefined;

export class PostCreateDto {
    constructor(
        public title: string,
        public content: string,
        public tags: string[],
        public imageUrl: string,
        public status: PostStatus,
        public authorId: IdType
    ) { }
}

export class Post extends PostCreateDto{
    constructor(
        public id: IdType,
        title: string,
        content: string,
        tags: string[],
        imageUrl: string,
        status: PostStatus,
        authorId: IdType
    ) {
        super(title, content, tags, imageUrl, status,authorId);
    }
}
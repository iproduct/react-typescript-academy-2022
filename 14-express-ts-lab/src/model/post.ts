export class Post {
    constructor(
        public id: string,
        public title: string,
        public authorId: string,
        public content: string,
        public imageUrl: string,
        public tags: string[]
    ) { }
}
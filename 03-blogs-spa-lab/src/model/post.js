export class Post {
    constructor(title, content, imageUrl, authorId, tags, likeCounter, id = undefined) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.authorId = authorId;
        this.tags = tags;
        this.likeCounter = likeCounter;
        this.id = id;
    }
}
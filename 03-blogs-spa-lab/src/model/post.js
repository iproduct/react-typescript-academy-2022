export class Post {
    static nextId = 0;
    static getNextId() {
        return ++Post.nextId;
    }
    id = Post.getNextId();
    constructor(title, content, imageUrl, authorId, tags, likeCounter){
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.authorId = authorId;
        this.tags = tags;
        this.likeCounter = likeCounter;
      }
}
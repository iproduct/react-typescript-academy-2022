import { addPost, getAllPosts } from "./service/blogs-api-client.js";

let posts = [];
const postsElem = document.getElementById("posts");

(async function init() {
    // addPostForm listeners
    const formElem = document.getElementById('post-form');
    formElem.addEventListener('submit', handleAddPostSubmit);

    // fetch intial posts
    posts = await getAllPosts();
    showPosts();
})();

function showPosts() {
    posts.forEach(post => {
        const item = document.createElement('li');
        item.innerHTML = `
        <span>${post.title}</span> :
        <span>${post.content}</span>
        `;
        postsElem.appendChild(item);
    });
}

async function handleAddPostSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {};
    for (const key of formData.keys()) {
        newPost[key] = key === 'tags' ?
            formData.get(key).split(/\s*,\s*/g).filter(tag => tag.length > 0)
            : formData.get(key);
    }
    const created = await addPost(newPost);
    console.log('Successfully added new post:', created);
    posts.push(created);
    showPosts()
}


import { getAllPosts } from "./service/blogs-api-client.js";


(async function init() {
    const posts = await getAllPosts();
    const postsElem = document.getElementById("posts");
    posts.forEach(post =>{
        const item = document.createElement('li');
        item.innerHTML = `
        <span>${post.title}</span> :
        <span>${post.content}</span>
        `;
        postsElem.appendChild(item);
    });
})();

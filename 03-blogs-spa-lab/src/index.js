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
        const card = document.createElement('div');
        card.className = 'card-container col s12 l6 xl4';
        card.innerHTML = `
        <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${post.imageUrl}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${post.title}<i
                        class="material-icons right">more_vert</i></span>
                <p><a href="#">This is a link</a></p>
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${post.title}<i
                        class="material-icons right">close</i></span>
                <p>${post.content}</p>
            </div>
        </div>
        `;
        postsElem.appendChild(card);
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


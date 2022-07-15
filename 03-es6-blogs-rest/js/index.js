const API_BASE_URL = "http://localhost:3000/api";
const results = document.getElementById("results");
const form = document.getElementById("add-post-form");

async function fetchPosts() {
    const postsResp = await fetch(`${API_BASE_URL}/posts`);
    const posts = await postsResp.json();
    console.log(posts);
    results.innerHTML = '';
    posts.forEach(appendPost);
}


function appendPost(post) {
    const div =  document.createElement("div");
    div.className = 'post-item';
    div.id = "post-" + post.id;
    div.innerHTML=`<header><h3>${post.id}: ${post.title}</h3><span class="delete">X</span></header>
    <p>Author: ${post.author}</p>`;
    results.appendChild(div);
    const buton = div.querySelector("span.delete");
    button.addEventListener('click', deletePost(post.id))
}

async function deletePost(postId) {
    console.log("DELETING ID = " + postId);
    const postsResp = await fetch(`${API_BASE_URL}/posts/${postId}`);
    const deleted = await postsResp.json();
    console.log(deleted);
    removePost(postId)
}

function removePost(postId) {
    const posts =  results.querySelectorAll(".post-item");
    for(const post of posts) {
        if(post.id === "post-" + post.id) {
            results.removeChild(post);
        }
    }
}

function clearForm() {
    form.reset();
}

async function addPost(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for(const key of formData.keys()) {
        data[key] = formData.get(key);
    }
    console.log(data);
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'',
        },
        body: JSON.stringify(data)
    });
    const createdPost = await response.json();
    console.log(createdPost);
    appendPost(createdPost);
    clearForm();
}

form.addEventListener("submit", addPost);

fetchPosts();
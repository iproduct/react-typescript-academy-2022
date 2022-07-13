const API_BASE_URL = "http://localhost:3000/api";
const results = document.getElementById("results");

async function fetchPosts() {
    const postsResp = await fetch(`${API_BASE_URL}/posts`);
    const posts = await postsResp.json();
    console.log(posts);
    posts.map(post => {
        const div =  document.createElement("div");
        div.className = 'post-item';
        div.innerHTML=`<h3>${post.id}: ${post.title}</h3><p>Author: ${post.author}</p>`;
        return div;
    }).forEach(div => {
        results.appendChild(div);
    });
}

fetchPosts();
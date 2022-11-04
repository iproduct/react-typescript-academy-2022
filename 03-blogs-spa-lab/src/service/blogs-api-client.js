const API_BASE_URL = `http://localhost:3000/api/posts`;

export async function getAllPosts() {
    try {
        const postsResp = await fetch(API_BASE_URL);
        if(postsResp.status >= 400) {
            Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch (err) {
        Promise.reject(err)
    }
}
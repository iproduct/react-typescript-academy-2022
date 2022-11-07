const API_BASE_URL = `http://localhost:9000/api/posts`;

export const getAllPosts = async () => handleJsonRequest(API_BASE_URL);

export const addPost = async (post) => handleJsonRequest(API_BASE_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
});


async function handleJsonRequest(url, options) {
    try {
        const postsResp = await fetch(url, options);
        if (postsResp.status >= 400) {
            Promise.reject(postsResp.body);
        }
        return postsResp.json();
    } catch (err) {
        Promise.reject(err)
    }
}
function demo() {
    const resultsElem = document.getElementById("results")
    fetch('users.json')
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            return fetch(`https://api.github.com/users/${users[0].username}`);
        })
        .then(githubResp => githubResp.json())
        .then(gitUser => {
            console.log(gitUser);
            document.createElement(div);
            const img = new Image();
            img.src = gitUser.avatar_url
            resultsElem.appendChild(img);
            return new Promise((resolve, reject) => {
                setTimeout(resolve, 5000, img)
            });
        }).then(img => {
            resultsElem.removeChild(img);
        })
        .finally(() => console.log("Demo finished."));
}

demo()
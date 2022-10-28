'use strict'

function init() {
    const resultsElem = document.getElementById("results");
    fetch("users.json")
        .then(usersResp => usersResp.json())
        .then(users => {
            console.log(users);
            // resultsElem.innerHTML = JSON.stringify(users);
            return fetch(`https://api.github.com/users/${users[0].username}`)
        }).then(gitUserResp => gitUserResp.json())
        .then(gitUser => {
            console.log(gitUser);
            const img = new Image();
            img.src = gitUser.avatar_url;
            resultsElem.appendChild(img);
        });
}

init();

function getRecentRepos(){
    // console.log("getRecentRepos() executed!");

    const username = "kavanparam";
    const url = `https://api.github.com/users/${username}/repos?sort=pushed`;

    fetch(url)
        .then((res) => res.json())    // convert response to JSON
        .then((obj) => {              // JSON to object
            console.log(obj);
            displayProjects(obj);
        });
}


function displayProjects(obj){
    // console.log("displayProjects(obj) executed!");

    // git-project-list -- manipulation

    projectList = "";
    for(repo of obj){
        // console.log(repo.name);
        projectList += `<li><dl><dt>${repo.name}</dt><dd>Last Commit: ${repo.pushed_at}</dd>`
                            +`<dd>Commit Details: `
                            +`${displayCommitData(repo)}</dd>`
                            +`<dd>Create Date: ${repo.created_at}</dd></dl></li>`
    }
    document.getElementById('git-project-list').innerHTML = projectList;
   
}


displayCommitData = (repo) => {
    fetch(repo.commits_url.replace("{/sha}", ""))
        .then(res => res.json())
        .then(obj => {
            console.log(obj[0].commit.message);
            return obj[0].commit.message;
        })
}



// +`${fetch(repo.commits_url.replace("{/sha}", "")).then(res => res.json()).then(obj => console.log(obj[0].commit.message))}</dd>`

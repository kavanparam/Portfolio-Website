function fetchRecentRepos(){

    const username = "kavanparam";
    const url = `https://api.github.com/users/${username}/repos?sort=pushed`;

    fetch(url)
        .then((res) => res.json())    // convert response to JSON
        .then((obj) => {              // JSON to object
            console.log(obj);
            displayProjects(obj);

            for(let repo of obj){
                return fetch(repo.commits_url.replace("{/sha}", ""))
                .then(res => res.json())
                .then(obj => {
                    console.log(obj[0].commit.message);
                    displayRepos(repo, obj[0].commit.message);
                    // return obj[0].commit.message;
                });
                
            }
        })
}

// Try to use a chained fetch and eliminate this block of code
function fetchCommitData (repo) {
    return fetch(repo.commits_url.replace("{/sha}", ""))
    .then(res => res.json())
    .then(obj => {
        // console.log(obj[0].commit.message);
        return obj[0].commit.message;
    });
}

async function displayProjects(obj){

    // Add project details to #git-project-list
    let projectList = "";
    for(let repo of obj){
        await fetchCommitData(repo).then(commitMsg => {
            projectList += displayRepos(repo, commitMsg);
        });
    }
    document.getElementById('git-project-list').innerHTML = projectList;
   
}

function displayRepos(repo, commitMsg){
    return [                        
        `<li><dl><dt>${repo.name}</dt><dd><p>Description: ${repo.description}</p></dd>`
            +`<dd>Last Commit: ${repo.pushed_at}</dd>`
            +`<dd id="fix-this">Last Commit Details: `
            +`${commitMsg}</dd>`
            +`<dd>Create Date: ${repo.created_at}</dd></dl></li>`
    ];
}






  
/*   async function displayProjects(obj) {
    var projectList = "";

    for (var repo of obj) {
      await fetchCommitData(repo).then((msg) => {
        projectList += displayRepo(repo, msg);
      });
    }

    document.getElementById("git-project-list").innerHTML = projectList;
  } */
  

/*   function displayRepo(repo, commitMessage) {
    return (
      `<li><dl><dt>${repo.name}</dt><dd>Last Commit: ${repo.pushed_at}</dd>` +
      `<dd>Commit Details: ` +
      `${commitMessage}</dd>` +
      `<dd>Create Date: ${repo.created_at}</dd></dl></li>`
    );
  } */
  

/*   function fetchCommitData(repo) {
    return fetch(repo.commits_url.replace("{/sha}", ""))
      .then((res) => res.json())
      .then((obj) => {
        console.log(obj[0].commit.message);
        return obj[0].commit.message;
      });
  } */
function getRecentRepos(){
    // console.log("getRecentRepos() executed!");

    const username = "kavanparam";
    const url = `https://api.github.com/users/${username}/repos?sort=pushed`;

    fetch(url)
        .then((res) => res.json())    // convert response to JSON
        .then((obj) => {              // JSON to object
            console.log(obj);
            displayProjects(obj);
        }              
        );

}

function displayProjects(obj){
    // console.log("displayProjects(obj) executed!");

    // git-project-list -- manipulation

    projectList = "";
    for(repo of obj){
        // console.log(repo.name);
        projectList += `<li>${repo.name}</li>`
    }
    document.getElementById('git-project-list').innerHTML = projectList;


}
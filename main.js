// main var
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// get repos function
function getRepos() {
  // if value is empty
  if (theInput.value == "") {
    reposData.innerHTML = "<span>please write github username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      //   fetch("https://api.github.com/users/Hadeel-amish/repos")
      //   .then((res) => {
      //     return res.json();
      //   })
      .then((response) => response.json())

      .then((repositories) => {
        // console.log(repos);
        // // empty the container
        reposData.innerHTML = "";
        // loop on repositories
        repositories.forEach((repo) => {
          //   console.log(repo.name);
          // create the main div element
          let mainDiv = document.createElement("div");
          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);
          //create repo url achor
          let theUrl = document.createElement("a");
          let theUrlText = document.createTextNode("visit");
          theUrl.appendChild(theUrlText);
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          // set attribute blank
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);
          // create stars count text
          let starsSpan = document.createElement("span");

          let starsText = document.createTextNode(
            `stars${repo.stargazers_count}`
          );
          // add stars count text to stars span
          starsSpan.appendChild(starsText);
          // append stars count span to main div
          mainDiv.appendChild(starsSpan);
          mainDiv.className = "repo-box";

          reposData.appendChild(mainDiv);
        });
      });
  }
}

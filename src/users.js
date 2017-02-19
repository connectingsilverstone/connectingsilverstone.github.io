// Wrap in function so we don't have people calling things when they shouldn't be.
(() => {

    const runGetRequest = (url, cb) => {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                cb(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    }

    const getGithubMembers = (cb) => runGetRequest(`./members.php`, (res) => cb(JSON.parse(res)));

    const leaders = ["XeliteXirish", "GilbertGobbels", "Kelwing", "floogulinc", "Newtsrock", "JoeTheHuman"]; // Get this from the API later on!

    const { htmlesc, htmlunesc } = (() => {
        let escape = document.createElement('textarea');
        return {
            htmlesc: (html) => {
                escape.textContent = html;
                return escape.innerHTML;
            },
            htmlunesc: html => {
                escape.innerHTML = html;
                return escape.textContent;
            }
        }
    })();

    // Not sure if the links are safe-- we need to look into this.
    const compileMemberHTML = (member) =>
        `
        <article class="media" href="https://www.github.com/${encodeURIComponent(member.login)}">
            <div class="media-left">
                <figure class = "image is-64x64">
                    <img src="${member.avatar_url}" alt="Image" />
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>${htmlesc(member.login)}</strong> ${member.name ? `(${htmlesc(member.name)})` : ""}
                    <br />
                    <small>
                        <b> Email:</b> ${member.email ? htmlesc(member.email) : "Not publicly shown"}
                    </small>
                    <br />
                    <small>
                        <b> Website:</b> ${member.blog ? htmlesc(member.blog) : "Not publicly shown"}
                    </small>
                    <br />
                    <br />
                    <i>
                        <b>Public Repositories:</b> ${htmlesc(htmlesc(member.public_repos))}
                    </i>
                </p>
            </div>
            </div>
        </article>
    `;

    function hideLoaders() {
        const loaders = {
            "tcdg_leaders_one": "loader1",
            "tcdg_leaders_two": "loader2",
            "members_parent_one": "loader3",
            "members_parent_two": "loader4"
        };
        for(let id in loaders)
            document.getElementById(id).removeChild(document.getElementById(loaders[id]));
    }

    function listUsersWithData() {
        let tcdgLeadersParentOne = document.getElementById("tcdg_leaders_one");
        let tcdgLeadersParentTwo = document.getElementById("tcdg_leaders_two");
        let membersParentOne = document.getElementById("members_parent_one");
        let membersParentTwo = document.getElementById("members_parent_two");

        const members = getGithubMembers((objGithubUsers) => {
          let leadersList = 1;
            hideLoaders();
            setTimeout(function () {
                for (let userIndex in objGithubUsers) {
                    const user = objGithubUsers[userIndex];

                    const membersParent = document.createElement('div');
                    membersParent.innerHTML = compileMemberHTML(user);
                    const membersNode = membersParent.firstElementChild;

                    ((userIndex < (objGithubUsers.length / 2)) ? membersParentOne : membersParentTwo).appendChild(membersNode)

                    if (leaders.indexOf(user.login) > -1){
                        ((leadersList <= leaders.length / 2) ? tcdgLeadersParentOne : tcdgLeadersParentTwo).appendChild(membersNode);
                        leadersList++;
                    }
                }
            }, 100);
        });
    }
    listUsersWithData();
})();

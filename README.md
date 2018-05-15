# gitlab-play

A CLI for playing with Gitlab API.

## How to run cli

Requires NodeJS 7.6+ (for async/await support).

    npm install -g

    # for local dev, link via:
    npm link

    export GITLAB_TOKEN=123
    export GITLAB_INSTANCE=https://gitlab.example.com

    # create a file with all project metadata (~/.gitlab-play/all-projects.json)
    gitlab-play save-all-projects

    # lookup project "id" and "name_with_whitespace" for a project that has the word "dashboard"
    npm install -g json
    cat ~/.gitlab-play/all-projects.json | json -a id name_with_namespace | grep dashboard

    # lookup tags for a project (projectId)
    gitlab-play tags 342

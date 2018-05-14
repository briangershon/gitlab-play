# gitlab-play

Playing with Gitlab API.

## How to run

Requires NodeJS 7.6+ (for async/await support).

    export GITLAB_TOKEN=123
    export GITLAB_INSTANCE=https://gitlab.example.com
    npm start
    # creates a file called all-projects.json

    # lookup a project
    npm run list-projects | grep dashboard

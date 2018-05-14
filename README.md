# gitlab-play

Playing with Gitlab API.

## How to run

Requires NodeJS 7.6+ (for async/await support).

    export GITLAB_TOKEN=123
    export GITLAB_INSTANCE=https://gitlab.example.com

    # create a file called all-projects.json
    npm run save-all-projects

    # lookup a project that has the word "dashboard"
    npm run list-projects | grep dashboard

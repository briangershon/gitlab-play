#!/usr/bin/env node
/* eslint-disable no-console, no-use-before-define */

const fs = require('fs');
const os = require('os');
const path = require('path');
const program = require('commander');
const figlet = require('figlet');
const { getAllProjects, getProjectTags } = require('./src/api-projects');

const { GITLAB_TOKEN, GITLAB_INSTANCE } = process.env;

console.log(figlet.textSync('gitlab-play', { horizontalLayout: 'full' }));

program
  .version('1.0.0')
  .description('Play with Gitlab API.');

program
  .command('save-all-projects')
  .description('Save list of all projects to a file')
  .action(() => {
    getAllProjects(GITLAB_TOKEN, GITLAB_INSTANCE).then((projects) => {
      const filePath = path.join(homePath(), 'all-projects.json');
      fs.writeFile(filePath, JSON.stringify(projects), 'utf8', () => {
        console.log(`wrote ${filePath}.`);
      });
    }).catch((err) => {
      console.log('err', err);
    });
  });

program
  .command('tags <projectId>')
  .description('Display tags for a specific project')
  .action((projectId) => {
    getProjectTags(GITLAB_TOKEN, GITLAB_INSTANCE, projectId).then((tags) => {
      console.log('tags', tags);
    });
  });

program.parse(process.argv);

/* Helpers */

// homePath returns absolute path to ~/.gitlab-play (and creates folder if it doesn't exist)
function homePath() {
  const homedir = os.homedir();
  const myPath = path.join(homedir, '.gitlab-play');
  try {
    fs.statSync(myPath);
  } catch (err) {
    fs.mkdir(myPath);
  }
  return myPath;
}

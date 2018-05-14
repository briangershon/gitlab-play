/* eslint-disable no-console */

const fs = require('fs');
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
      fs.writeFile('all-projects.json', JSON.stringify(projects), 'utf8', () => {
        console.log('wrote all-projects.json');
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

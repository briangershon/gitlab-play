const axios = require('axios');
const parse = require('parse-link-header');
const fs = require('fs');

GITLAB_TOKEN = process.env.GITLAB_TOKEN;
GITLAB_INSTANCE = process.env.GITLAB_INSTANCE;

async function getAllProjects() {
  const options = {
    headers: {
      'Private-Token': GITLAB_TOKEN
    }
  };

  const projects = [];

  let url = `${GITLAB_INSTANCE}/api/v4/projects?per_page=100`;

  while (url) {
    const response = await axios.get(url, options);
    const result = response.data;
    result.map((item) => {
      projects.push({ id: item.id, name: item.name, name_with_namespace: item.name_with_namespace });
    });
    const next = parse(response.headers['link'])['next'];
    if (next) {
      url = next.url;
    } else {
      url = '';
    }
  }
  return projects;
}

getAllProjects().then((projects) => {
   fs.writeFile('all-projects.json', JSON.stringify(projects), 'utf8', () => {
     console.log('wrote all-projects.json');
   });
}).catch((err) => {
  console.log('err', err);
});

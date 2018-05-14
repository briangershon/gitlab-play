/* eslint-disable no-console, no-await-in-loop */
const axios = require('axios');
const parseLinkHeader = require('parse-link-header');

function nextURL(responseHeaders) {
  const { next } = parseLinkHeader(responseHeaders.link);
  if (next) {
    return next.url;
  }
  return '';
}

module.exports.getAllProjects = async function getAllProjects(GITLAB_TOKEN, GITLAB_INSTANCE) {
  const options = {
    headers: {
      'Private-Token': GITLAB_TOKEN,
    },
  };

  const projects = [];

  let url = `${GITLAB_INSTANCE}/api/v4/projects?per_page=100`;

  while (url) {
    console.log(`Fetching page of projects [${url}]...`);
    const response = await axios.get(url, options);
    const result = response.data;
    projects.push(...result);
    url = nextURL(response.headers);
  }
  console.log(`Done fetching. Found ${projects.length} projects.`);
  return projects;
};

var axios = require('axios');
var parse = require('parse-link-header');

GITLAB_TOKEN = process.env.GITLAB_TOKEN;
GITLAB_INSTANCE = process.env.GITLAB_INSTANCE;

async function getProjects() {
  const options = {
    headers: {
      'Private-Token': GITLAB_TOKEN
    }
  };

  const response = await axios.get(`${GITLAB_INSTANCE}/api/v4/projects?per_page=100`, options);
  return response;
}

getProjects().then((response) => {
  const result = response.data;
  console.log(parse(response.headers['link'])['next'].url);
  console.log(result.map((item) => {
     return { id: item.id, name: item.name, name_with_namespace: item.name_with_namespace };
   }));
}).catch((err) => {
  console.log('err', err);
});

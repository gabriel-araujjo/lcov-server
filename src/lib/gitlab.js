const gitlabBase = 'https://gitlab.com';

function urlQuery(query) {
  const esc = encodeURIComponent;
  return Object.entries(query)
      .map(([key, value]) => esc(key) + '=' + esc(value))
      .join('&');
}

async function authenticate(state) {
  const query = urlQuery({
    client_id: process.env.REACT_APP_GITLAB_CLIENT_ID,
    redirect_uri: new URL('/cb'),
    response_type: 'code',
    scope: 'read_repository',
    state
  });

  
}

async function getProjectId(rep) {
  const query = `query ProjectId($rep: ID!) {
        project(fullPath: $rep) {id}
    }`;

  const response = await fetch(`${gitlabBase}/api/graphql`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query, variables: {rep}})
  });
  const json = await response.json();
  const project = json.data.project;
  if (!project) throw Error('not found');
  const id = project.id;
  return id.substr(id.lastIndexOf('/') + 1);
}

async function getProjectTree(id, com, path) {
  let url = new URL(`/api/v4/projects/${id}/repository/tree`, gitlabBase);
  let query = {};
  if (com) query.ref = com;
  if (path) query.path = path;
  query = urlQuery(query);
  if (query) url += '?' + query;
  let nextPage = url;
  let pages = [];
  while (nextPage) {
    const response = await fetch(nextPage);
    const links = parsePaginationHeader(response);
    nextPage = links.next;
    pages.push(response.json());
  }
  pages = await Promise.all(pages);
  return pages.flat();
}

function parsePaginationHeader(response) {
  console.log(response.headers.get('Link'));
  return Object.fromEntries(
      response.headers.get('Link').split(',').map(link => {
        const [url, relPart] = link.split(';');
        const [, rel] = relPart.split('=');
        return [rel.trim(), url.trim().substr(1, url.length - 2)]
      }));
}

id = await getProjectId('sbtvd-html5/wpt');
t = await getProjectTree(id);

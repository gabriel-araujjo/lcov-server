const base = 'https://gitlab.com/api';

import {urlQuery} from './util.js';

export async function getProjectIdAndLastCommit(rep) {
  const query =
      `query ProjectId($rep: ID!) { project(fullPath: $rep) {id, repository {tree{lastCommit{sha}}}} }`;

  const response = await fetch(`${base}/graphql`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({query, variables: {rep}})
  });
  const json = await response.json();
  const project = json.data.project;
  if (!project) throw Error('not found');
  const {id, repository: {tree: {lastCommit: {sha}}}} = project;
  return [id.substr(id.lastIndexOf('/') + 1), sha];
}

async function getProjectTree(id, com, path) {
  let url = `${base}/v4/projects/${id}/repository/tree`;
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

export async function getProjectBlob(id, com, path) {
  const url = `${base}/v4/projects/${encodeURIComponent(id)}/repository/files/${encodeURIComponent(path)}/raw?ref=${encodeURIComponent(com)}`;
  const response = await fetch(url);
  return await response.text();
}

function parsePaginationHeader(response) {
  return Object.fromEntries(
      response.headers.get('Link').split(',').map(link => {
        const [url, relPart] = link.split(';');
        const [, rel] = relPart.split('=');
        return [rel.trim(), url.trim().substr(1, url.length - 2)]
      }));
}

// TODO
async function authenticate(state) {
  const query = urlQuery({
    client_id: process.env.REACT_APP_GITLAB_CLIENT_ID,
    redirect_uri: new URL('/cb'),
    response_type: 'code',
    scope: 'read_repository',
    state
  });
}

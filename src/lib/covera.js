const base = '/api';

import {urlQuery, calcCoveragePair} from './util.js';

async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok) throw Error();
  return await resp.json();
}

export function getFileCoverage(rep, com, pat) {
  return fetchJson(`${base}/file?${urlQuery({rep, com, pat})}`);
}

export async function getReport(rep, com) {
  const report = await fetchJson(`${base}/report?${urlQuery({rep, com})}`);
  return report[8].map(e => [e[0], ...calcCoveragePair(e[1])]);
}

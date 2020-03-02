const base = '/api';

import {urlQuery} from './util.js';

export async function getFileCoverage(rep, com, pat) {
  const url = `${base}/file?${urlQuery({rep, com, pat})}`;
  const resp = await fetch(url);
  if (!resp.ok) throw Error();
  return await resp.json();
}

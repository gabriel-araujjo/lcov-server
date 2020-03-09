const db = require('./database')
const {randomFillSync} = require('crypto')
const {notFound} = require('./errors')

function gid() {
  const buf = Buffer.alloc(4)
  randomFillSync(buf)
  buf[0] &= 0x7f
  return buf.readUInt32BE()
}

/*
// Example
[
  // project, commit, branch
  'example/example', '9a29f044716263389ec51579df2306355e6dcbad', 'master',
  // CI
  'travis-ci', // Service name
  12333, // Job
  54 // Pull request or merge request
  // coverage
  [
    // file
    'main.c',
    [
      // line_number, hits, branchCount, branchesHit
      [5, 2, 1, 1],
      [6, 3, 1, 1],
      [8, 1, 2, 1]
    ],
    [
      // start_line, end_line, name, hits, blockCount, blocksHit
      [5, 10, 'main()', 1, 5, 3]
    ]
  ],
  [
    // file
    'print.c',
    [
      // line_number, hits, branchCount, branchesHit
      [4, 3, 1, 1],
      [5, 3, 1, 1]
    ]
  ]
]
*/

function calcTotalCoverage(coverage) {
  let blockCount = 0
  let blocksHit = 0
  for (const [, lines] of coverage) {
    for (const [, , bct, bex] of lines) {
      blockCount += bct
      blocksHit += bex
    }
  }

  return [blockCount, blocksHit]
}

const fProject = rep => ({
  name: 'find_project',
  text: 'SELECT gid FROM project WHERE rep = $1',
  values: [rep],
  rowMode: 'array'
})

const focProject = rep => ({
  name: 'insert_project',
  text: 'WITH new_row AS (' +
      'INSERT INTO project (gid, rep) ' +
      'VALUES ($1, $2) ON CONFLICT DO NOTHING ' +
      'RETURNING gid) ' +
      'SELECT gid FROM new_row ' +
      'UNION ' +
      'SELECT gid FROM project WHERE rep = $2 LIMIT 1',
  values: [gid(), rep],
  rowMode: 'array'
})

const cReport = (pid, com, bra, rat, ci, job, prq, bct, bex) => ({
  name: 'insert_report',
  text:
      'INSERT INTO report (gid, pid, com, bra, rat, ci, job, prq, bct, bex) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING gid',
  values: [gid(), pid, com, bra, rat, ci, job, prq, bct, bex],
  rowMode: 'array'
})

const focFile = (pid, pat) => ({
  name: 'insert_file',
  text: 'WITH new_row AS (INSERT INTO file (gid, pid, pat) ' +
      'VALUES ($1, $2, $3) ON CONFLICT DO NOTHING ' +
      'RETURNING gid) ' +
      'SELECT gid FROM new_row ' +
      'UNION ' +
      'SELECT gid FROM file WHERE pid = $2 AND pat = $3 LIMIT 1',
  values: [gid(), pid, pat],
  rowMode: 'array'
})

const cLine = (fid, rid, lno, hit, bct, bex) => ({
  name: 'insert_line_cov',
  text: 'INSERT INTO line_cov (fid, rid, lno, hit, bct, bex) ' +
      'VALUES ($1, $2, $3, $4, $5, $6) RETURNING 1',
  values: [fid, rid, lno, hit, bct, bex],
  rowMode: 'array'
})

const cFunc = (fid, rid, sln, eln, fna, hit, bct, bex) => ({
  name: 'insert_func_cov',
  text: 'INSERT INTO func_cov (fid, rid, sln, eln, fna, hit, bct, bex) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING 1',
  values: [fid, rid, sln, eln, fna, hit, bct, bex],
  rowMode: 'array'
})

const fReportsByProject = (pid, before, limit) => ({
  name: 'find_reports_by_rep',
  text: 'SELECT com, bra, rat, ci, job, prq, bct, bex FROM report ' +
      'WHERE pid = $1 AND rat < $2 ' +
      'ORDER BY rat DESC ' +
      'LIMIT $3',
  values: [pid, before, limit],
  rowMode: 'array'
})

const fReport = (pid, com) => ({
  name: 'find_reports',
  text: 'SELECT gid, com, bra, rat, ci, job, prq, bct, bex FROM report ' +
      'WHERE pid = $1 AND (bra = $2 OR com = $2) ' +
      'ORDER BY rat DESC ' +
      'LIMIT 1',
  values: [pid, com],
  rowMode: 'array'
})

const fLineCovByReport = rid => ({
  name: 'find_line_cov_by_rep',
  text: 'SELECT fid, lno, hit, bct, bex FROM line_cov ' +
      'WHERE rid = $1 ' +
      'ORDER BY fid, lno',
  values: [rid],
  rowMode: 'array'
})

const fFile = (pid, pat) => ({
  name: 'find_file',
  text: 'SELECT gid FROM file ' +
      'WHERE pid = $1 AND pat = $2',
  values: [pid, pat],
  rowMode: 'array'
})

const fLineCovByFile = (rid, fid) => ({
  name: 'find_line_cov_by_rep',
  text: 'SELECT lno, hit, bct, bex FROM line_cov ' +
      'WHERE rid = $1 AND fid = $2 ' +
      'ORDER BY lno',
  values: [rid, fid],
  rowMode: 'array'
})

const fFuncCovByReport = rid => ({
  name: 'find_func_cov_by_rep',
  text: 'SELECT fid, sln, eln, fna, hit, bct, bex FROM func_cov ' +
      'WHERE rid = $1 ' +
      'ORDER BY fid, sln',
  values: [rid],
  rowMode: 'array'
})

const fFuncCovByFile = (rid, fid) => ({
  name: 'find_func_cov_by_rep',
  text: 'SELECT sln, hit, bct, bex, eln, fna FROM func_cov ' +
      'WHERE rid = $1 AND fid = $2 ' +
      'ORDER BY sln',
  values: [rid, fid],
  rowMode: 'array'
})

const fFilesInProject = (pid, fids) => ({
  name: 'find',
  text: 'SELECT gid, pat FROM file ' +
      'WHERE pid = $1 AND gid=ANY($2::bigint[])',
  values: [pid, fids],
  rowMode: 'array'
})

const rows = db => q => db.query(q).then(r => r.rows)
const firstRow = db => q => db.query(q).then(r => {
  if (r.rows.length) return r.rows[0];
  throw new notFound();
})

function* map(f, iter) {
  while (true) {
    let {done, value} = iter.next()
    if (done) return;
    else yield f(value)
  }
}

// It throws an exception if an error occurrs
module.exports.save = async function(message) {
  const [rep, com, bra, ci, job, prq, coverage] = message
  const rat = new Date();
  const [bct, bex] = calcTotalCoverage(coverage)

  const client = await db.connect();
  try {
    await client.query('BEGIN')
    const q = firstRow(client)
    const [pid] = await q(focProject(rep))
    const [rid] = await q(cReport(pid, com, bra, rat, ci, job, prq, bct, bex))

    async function saveCoverage([pat, lineCov, funcCov]) {
      const [fid] = await q(focFile(pid, pat));
      await Promise.all([
        ...lineCov.map(line => q(cLine(fid, rid, ...line))),
        ...funcCov.map(func => q(cFunc(fid, rid, ...func)))
      ]);
    }

    await Promise.all(coverage.map(saveCoverage));
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  }
  client.release()
  return [rep, com]
};

module.exports.getProjectCoverage = async function(rep, before, limit) {
  const [pid] = await firstRow(db)(fProject(rep))
  return await rows(db)(fReportsByProject(pid, before, limit))
};

module.exports.getCommitCoverage = async function(rep, com) {
  const q = firstRow(db)
  const r = rows(db)
  const [pid] = await q(fProject(rep))
  const [rid, ...report] = await q(fReport(pid, com))
  const lineCov = await r(fLineCovByReport(rid))
  const funcCov = await r(fFuncCovByReport(rid))
  const covMap = new Map()
  const getOrCreate = fid =>
      covMap.get(fid) || covMap.set(fid, [[], []]).get(fid);

  for (const [fid, ...line] of lineCov) {
    getOrCreate(fid)[0].push(line)
  }

  for (const [fid, ...func] of funcCov) {
    getOrCreate(fid)[1].push(func)
  }


  const fids = [...covMap.keys()];
  const pathMap = Object.fromEntries(await r(fFilesInProject(pid, fids)))
  const coverage = map(([fid, [lines, funcs]]) => {
    return [pathMap[fid], lines, funcs];
  }, covMap.entries())

  return [...report, [...coverage]]
};

module.exports.getFileCoverage = async function(rep, com, pat) {
  const q = firstRow(db)
  const r = rows(db)
  const [pid] = await q(fProject(rep))
  const [rid, ...report] = await q(fReport(pid, com))
  const [fid] = await q(fFile(pid, pat))
  const lineCov = await r(fLineCovByFile(rid, fid))
  const funcCov = await r(fFuncCovByFile(rid, fid))

  return [...report, lineCov, funcCov]
};

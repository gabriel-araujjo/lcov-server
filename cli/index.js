const Url = require('url');
const http = require('http');
const https = require('https');

const parsers = require('./parsers')

const git = require('./git');
const ci = require('./ci');

function upload(url, data) {
  const parsedUrl = Url.parse(url);
  const protocol = parsedUrl.protocol || 'https:';
  const [agent, defaultPort] =
      protocol === 'https:' ? [https, 443] : [http, 80];

  const host = parsedUrl.hostname;

  const options = {
    hostname: host,
    port: parsedUrl.port || defaultPort,
    path: '/api/upload',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  };

  return new Promise((resolve, reject) => {
    const req = agent.request(options, res => {
      const status = res.statusCode;
      if (status == 201) return resolve(Url.resolve(url, res.headers.location));

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        if (!res.complete) return reject(Error('Connection lost'));
        const data = Buffer.concat(chunks).toString('utf-8');
        const {message} = JSON.parse(data);
        return reject(Error(message));
      })
    });
    req.write(JSON.stringify(data));
    req.end();
    req.on('error', () => reject(Error(`Cannot access server ${host}`)));
  });
}

module.exports = async function cli({parser, url, shouldExclude}) {
  const gitInfo = git.parse('.');
  const ciInfo = ci();
  const coverage = await parsers[parser].parse(shouldExclude);

  logCoverage(coverage);
  return await upload(url, [...gitInfo, ...ciInfo, coverage]);
};

function logCoverage(coverage) {
  const fileColumn = 'Files'.padEnd(43, ' ');

  console.log();
  console.log('# Coverage report');
  console.log();
  console.log(`| ${fileColumn} |  Lines | Functions | Branches |`);
  console.log(`|${''.padEnd(45, '-')}|-------:|----------:|---------:|`);
  coverage.forEach(logFileCoverage);
  console.log();
  console.log('---');
  console.log();
  console.log(`Total branch coverage: **${
      formatCoverage(totalCov(coverage, 1, calcBranchCov), 0)}**`)
}

function logFileCoverage([file, lines, funcs]) {
  if (file.length > 43) file = '...' + file.substr(43 - 3 - file.length);

  file = (`${file}`).padEnd(43, ' ')

  const lineCov = formatCoverage(calcCoverage(lines));
  const funcCov = formatCoverage(calcCoverage(funcs));
  const branchCov = formatCoverage(calcBranchCov(lines));

  console.log(`| ${file} | ${lineCov} |    ${funcCov} |   ${branchCov} |`)
}

function formatCoverage([hit, count], width = 5) {
  return (hit / count * 100).toFixed(1).padStart(width, ' ') + '%'
}

function calcCoverage(coverage) {
  let count = coverage.length;
  let hit = coverage.reduce((s, {hit}) => s + Boolean(hit), 0);
  return [hit, count]
}

function calcBranchCov(lines) {
  let blockCount = 0
  let blocksHit = 0
  for (const {bct, bex} of lines) {
    blockCount += bct
    blocksHit += bex
  }

  return [blocksHit, blockCount]
}

function totalCov(coverage, attr, itemMap) {
  let blockCount = 0;
  let blocksHit = 0;
  for (const file of coverage) {
    const [bex, bct] = itemMap(file[attr]);
    blockCount += bct;
    blocksHit += bex;
  }

  return [blocksHit, blockCount]
}

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

  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || defaultPort,
    path: '/api/upload',
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  };

  return new Promise((resolve, reject) => {
    const req = agent.request(options, res => {
      let responseStr = '';
      res.on('data', chunk => {
        responseStr += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(responseStr);
          if (response.error) {
            return reject(response.error);  // eslint-disable-line
          } else {
            return resolve(response);
          }
        } catch (ex) {
          return reject(Error(ex));
        }
      });
    });
    req.write(JSON.stringify(data));
    req.end();
  });
}

module.exports = async function cli({parser, input, url, shouldExclude}) {
  const gitInfo = git.parse('.');
  const ciInfo = ci();
  const coverage = await parsers[parser].parse(input, shouldExclude);

  return await upload(url, [...gitInfo, ...ciInfo, coverage]);
};


require('dotenv').config()
const express = require('express');
// const Badge = require('badgeit');
// const parse = require('git-url-parse');
const path = require('path');
const serveStatic = require('serve-static');
const compression = require('compression');
const bodyParser = require('body-parser');
const zlib = require('zlib');
const url = require('url');

zlib.level = zlib.Z_BEST_COMPRESSION;

const Coverage = require('./lib/coverage');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json({limit: '100MB'}));
app.use(compression());
app.use(serveStatic(path.resolve(__dirname, 'dist')));

app.post('/api/upload', (req, res, next) => {
  Coverage.save(req.body)
      .then(([rep, com]) => {
        const pathname = '/api/report';
        const location = url.format({query: {rep, com}, pathname});
        res.setHeader('Location', location)
        res.status(201).end();
      })
      .catch(next);
});

// app.get('/api/report')

// app.get('/api/repos', asyncMiddleware(async (req, res) => {
//           try {
//             const repos = await Coverage.repos();
//             res.send(repos);
//           } catch (error) {
//             res.status(500);
//             res.send({error});
//           }
//         }));

// app.get('/api/feed/:page?', asyncMiddleware(async (req, res) => {
//           const {page} = req.params;

//           try {
//             const feed = await Coverage.feed(page);
//             res.send(feed);
//           } catch (error) {
//             res.status(500);
//             res.send({error});
//           }
//         }));

// app.get('/api/repos/:service/:owner/', asyncMiddleware(async (req, res) => {
//           const {service, owner} = req.params;

//           try {
//             const coverages = await Coverage.repos(
//                 new RegExp(`${service.replace(/%2E/g, '.')}.*/${owner}/`));
//             res.send(coverages);
//           } catch (error) {
//             res.status(500);
//             res.send({error});
//           }
//         }));

// app.get(
//     '/api/coverage/:service/:owner/:repo/',
//     asyncMiddleware(async (req, res) => {
//       const {limit} = req.query;
//       const {service, owner, repo} = req.params;

//       try {
//         const coverages = await Coverage.get(
//             new RegExp(`${service.replace(/%2E/g, '.')}.*/${owner}/${repo}`),
//             limit);
//         res.send(coverages);
//       } catch (error) {
//         res.status(500);
//         res.send({error});
//       }
//     }));

// app.get(
//     '/badge/:service/:owner/:repo.svg', asyncMiddleware(async (req, res) => {
//       const {service, owner, repo} = req.params;

//       try {
//         const coverages = await Coverage.get(
//             new RegExp(`${service.replace(/%2E/g, '.')}.*/${owner}/${repo}`),
//             1);
//         const coverage = coverages[0];
//         const {history} = coverage;
//         const {source_files} = history[0];
//         let found = 0;
//         let hit = 0;
//         source_files.forEach((file) => {
//           const {
//             lines =
//             {
//               hit: 0, found: 0
//             }
//           } = file;
//           found += lines.found;
//           hit += lines.hit;
//         });
//         const percentage = parseInt((hit / found) * 100);
//         const color = percentage >= 85 ?
//             '#3DB712' :
//             percentage <= 85 && percentage >= 70 ? '#caa300' : '#cc5338';

//         const badge = await Badge(
//             {color: {right: color}, text: ['coverage', `${percentage}%`]});
//         res.set('Content-Type', 'image/svg+xml; charset=utf-8');
//         res.send(badge);
//       } catch (error) {
//         const badge = await Badge(
//             {color: {right: '#b63b3b'}, text: ['coverage', 'not found']});
//         res.set('Content-Type', 'image/svg+xml; charset=utf-8');
//         res.send(badge);
//       }
//     }));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () => console.log(`listening on http://localhost:${port}`));

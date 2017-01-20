const MongoClient = require('mongodb').MongoClient;

/**
 * @class Coverage
 * @example
 *
 *{
 *   "source_files": [{
 *       "name": "util/lcov.js",
 *       "source": "var fs = require('fs'),\n    path = require('path');\n\nvar exists = fs.exists || path.exists;\n\nvar walkFile = function(str, cb) {\n    var data = [], item;\n\n    [ 'end_of_record' ].concat(str.split('\\n')).forEach(function(line) {\n        line = line.trim();\n        var allparts = line.split(':'),\n            parts = [allparts.shift(), allparts.join(':')],\n            lines, fn;\n\n        switch (parts[0].toUpperCase()) {\n            case 'TN':\n                item.title = parts[1].trim();\n                break;\n            case 'SF':\n                item.file = parts.slice(1).join(':').trim();\n                break;\n            case 'FNF':\n                item.functions.found = Number(parts[1].trim());\n                break;\n            case 'FNH':\n                item.functions.hit = Number(parts[1].trim());\n                break;\n            case 'LF':\n                item.lines.found = Number(parts[1].trim());\n                break;\n            case 'LH':\n                item.lines.hit = Number(parts[1].trim());\n                break;\n            case 'DA':\n                lines = parts[1].split(',');\n                item.lines.details.push({\n                    line: Number(lines[0]),\n                    hit: Number(lines[1])\n                });\n                break;\n            case 'FN':\n                fn = parts[1].split(',');\n                item.functions.details.push({\n                    name: fn[1],\n                    line: Number(fn[0])\n                });\n                break;\n            case 'FNDA':\n                fn = parts[1].split(',');\n                item.functions.details.some(function(i, k) {\n                    if (i.name === fn[1] && i.hit === undefined) {\n                        item.functions.details[k].hit = Number(fn[0]);\n                        return true;\n                    }\n                });\n                break;\n            case 'BRDA':\n                fn = parts[1].split(',');\n                item.branches.details.push({\n                    line: Number(fn[0]),\n                    block: Number(fn[1]),\n                    branch: Number(fn[2]),\n                    taken: ((fn[3] === '-') ? 0 : Number(fn[3]))\n                });\n                break;\n            case 'BRF':\n                item.branches.found = Number(parts[1]);\n                break;\n            case 'BRH':\n                item.branches.hit = Number(parts[1]);\n                break;\n        }\n\n        if (line.indexOf('end_of_record') > -1) {\n            data.push(item);\n            item = {\n              lines: {\n                  found: 0,\n                  hit: 0,\n                  details: []\n              },\n              functions: {\n                  hit: 0,\n                  found: 0,\n                  details: []\n              },\n              branches: {\n                hit: 0,\n                found: 0,\n                details: []\n              }\n            };\n        }\n    });\n\n    data.shift();\n\n    if (data.length) {\n        cb(undefined, data);\n    } else {\n        cb('Failed to parse string');\n    }\n};\n\nmodule.exports.parse = function(file, cb) {\n    exists(file, function(x) {\n        if (!x) {\n            return walkFile(file, cb);\n        }\n        fs.readFile(file, 'utf8', function(err, str) {\n            walkFile(str, cb);\n        });\n    });\n\n};\n",
 *       "coverage": [{
 *           "lines": {
 *               "found": 53,
 *               "hit": 53,
 *               "details": [{
 *                   "line": 1,
 *                   "hit": 1
 *               }, {
 *                   "line": 2,
 *                   "hit": 1
 *               }, {
 *                   "line": 7,
 *                   "hit": 1
 *               }, {
 *                   "line": 8,
 *                   "hit": 3
 *               }, {
 *                   "line": 10,
 *                   "hit": 3
 *               }, {
 *                   "line": 11,
 *                   "hit": 424
 *               }, {
 *                   "line": 12,
 *                   "hit": 424
 *               }, {
 *                   "line": 13,
 *                   "hit": 424
 *               }, {
 *                   "line": 16,
 *                   "hit": 424
 *               }, {
 *                   "line": 18,
 *                   "hit": 4
 *               }, {
 *                   "line": 19,
 *                   "hit": 4
 *               }, {
 *                   "line": 21,
 *                   "hit": 4
 *               }, {
 *                   "line": 22,
 *                   "hit": 4
 *               }, {
 *                   "line": 24,
 *                   "hit": 3
 *               }, {
 *                   "line": 25,
 *                   "hit": 3
 *               }, {
 *                   "line": 27,
 *                   "hit": 3
 *               }, {
 *                   "line": 28,
 *                   "hit": 3
 *               }, {
 *                   "line": 30,
 *                   "hit": 3
 *               }, {
 *                   "line": 31,
 *                   "hit": 3
 *               }, {
 *                   "line": 33,
 *                   "hit": 3
 *               }, {
 *                   "line": 34,
 *                   "hit": 3
 *               }, {
 *                   "line": 36,
 *                   "hit": 263
 *               }, {
 *                   "line": 37,
 *                   "hit": 263
 *               }, {
 *                   "line": 41,
 *                   "hit": 263
 *               }, {
 *                   "line": 43,
 *                   "hit": 48
 *               }, {
 *                   "line": 44,
 *                   "hit": 48
 *               }, {
 *                   "line": 48,
 *                   "hit": 48
 *               }, {
 *                   "line": 50,
 *                   "hit": 48
 *               }, {
 *                   "line": 51,
 *                   "hit": 48
 *               }, {
 *                   "line": 52,
 *                   "hit": 591
 *               }, {
 *                   "line": 53,
 *                   "hit": 48
 *               }, {
 *                   "line": 54,
 *                   "hit": 48
 *               }, {
 *                   "line": 57,
 *                   "hit": 48
 *               }, {
 *                   "line": 59,
 *                   "hit": 23
 *               }, {
 *                   "line": 60,
 *                   "hit": 23
 *               }, {
 *                   "line": 66,
 *                   "hit": 23
 *               }, {
 *                   "line": 68,
 *                   "hit": 2
 *               }, {
 *                   "line": 69,
 *                   "hit": 2
 *               }, {
 *                   "line": 71,
 *                   "hit": 2
 *               }, {
 *                   "line": 72,
 *                   "hit": 2
 *               }, {
 *                   "line": 75,
 *                   "hit": 424
 *               }, {
 *                   "line": 76,
 *                   "hit": 7
 *               }, {
 *                   "line": 77,
 *                   "hit": 7
 *               }, {
 *                   "line": 97,
 *                   "hit": 3
 *               }, {
 *                   "line": 99,
 *                   "hit": 3
 *               }, {
 *                   "line": 100,
 *                   "hit": 2
 *               }, {
 *                   "line": 102,
 *                   "hit": 1
 *               }, {
 *                   "line": 106,
 *                   "hit": 1
 *               }, {
 *                   "line": 107,
 *                   "hit": 3
 *               }, {
 *                   "line": 108,
 *                   "hit": 3
 *               }, {
 *                   "line": 109,
 *                   "hit": 2
 *               }, {
 *                   "line": 111,
 *                   "hit": 1
 *               }, {
 *                   "line": 112,
 *                   "hit": 1
 *               }]
 *           },
 *           "functions": {
 *               "hit": 6,
 *               "found": 6,
 *               "details": [{
 *                   "name": "(anonymous_0)",
 *                   "line": 7,
 *                   "hit": 3
 *               }, {
 *                   "name": "(anonymous_1)",
 *                   "line": 10,
 *                   "hit": 424
 *               }, {
 *                   "name": "(anonymous_2)",
 *                   "line": 51,
 *                   "hit": 591
 *               }, {
 *                   "name": "(anonymous_3)",
 *                   "line": 106,
 *                   "hit": 3
 *               }, {
 *                   "name": "(anonymous_4)",
 *                   "line": 107,
 *                   "hit": 3
 *               }, {
 *                   "name": "(anonymous_5)",
 *                   "line": 111,
 *                   "hit": 1
 *               }]
 *           },
 *           "branches": {
 *               "hit": 24,
 *               "found": 24,
 *               "details": [{
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 0,
 *                   "taken": 4
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 1,
 *                   "taken": 4
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 2,
 *                   "taken": 3
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 3,
 *                   "taken": 3
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 4,
 *                   "taken": 3
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 5,
 *                   "taken": 3
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 6,
 *                   "taken": 263
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 7,
 *                   "taken": 48
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 8,
 *                   "taken": 48
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 9,
 *                   "taken": 23
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 10,
 *                   "taken": 2
 *               }, {
 *                   "line": 16,
 *                   "block": 0,
 *                   "branch": 11,
 *                   "taken": 2
 *               }, {
 *                   "line": 52,
 *                   "block": 1,
 *                   "branch": 0,
 *                   "taken": 48
 *               }, {
 *                   "line": 52,
 *                   "block": 1,
 *                   "branch": 1,
 *                   "taken": 543
 *               }, {
 *                   "line": 52,
 *                   "block": 2,
 *                   "branch": 0,
 *                   "taken": 591
 *               }, {
 *                   "line": 52,
 *                   "block": 2,
 *                   "branch": 1,
 *                   "taken": 53
 *               }, {
 *                   "line": 64,
 *                   "block": 3,
 *                   "branch": 0,
 *                   "taken": 1
 *               }, {
 *                   "line": 64,
 *                   "block": 3,
 *                   "branch": 1,
 *                   "taken": 22
 *               }, {
 *                   "line": 75,
 *                   "block": 4,
 *                   "branch": 0,
 *                   "taken": 7
 *               }, {
 *                   "line": 75,
 *                   "block": 4,
 *                   "branch": 1,
 *                   "taken": 417
 *               }, {
 *                   "line": 99,
 *                   "block": 5,
 *                   "branch": 0,
 *                   "taken": 2
 *               }, {
 *                   "line": 99,
 *                   "block": 5,
 *                   "branch": 1,
 *                   "taken": 1
 *               }, {
 *                   "line": 108,
 *                   "block": 6,
 *                   "branch": 0,
 *                   "taken": 2
 *               }, {
 *                   "line": 108,
 *                   "block": 6,
 *                   "branch": 1,
 *                   "taken": 1
 *               }]
 *           },
 *           "title": "",
 *           "source": "",
 *           "file": "/Users/gacsapo/Documents/temp/node-coverage-server/util/lcov.js"
 *       }]
 *   }],
 *   "git": {
 *       "head": {
 *           "id": "07e4ee9f38d7c41fed09a2b93f6ce23c4a2c49da",
 *           "committer_name": "Gabriel Csapo",
 *           "committer_email": "gabecsapo@gmail.com",
 *           "message": "Initial commit",
 *           "author_name": "Gabriel Csapo",
 *           "author_email": "gabecsapo@gmail.com"
 *       },
 *       "branch": "master",
 *       "remotes": [{
 *           "name": "origin",
 *           "url": "https://github.com/gabrielcsapo/node-coverage-server.git"
 *       }]
 *   },
 *   "run_at": "2017-01-17T23:18:16.248Z",
 *   "repo_token": "testing"
 *}
 **/
module.exports = {
    save: function(model) {
      return new Promise(function(resolve, reject) {
          MongoClient.connect('mongodb://localhost:32768/node-coverage-server', function(err, db) {
              if (err) { return reject(err); }
              var collection = db.collection('coverages');
              collection.insertOne(model, function(err, result) {
                if(err) { return reject(err); }
                resolve(result);
              });
          });
      });
    },
    getAll: function() {
        return new Promise(function(resolve, reject) {
            MongoClient.connect('mongodb://localhost:32768/node-coverage-server', function(err, db) {
                if (err) { return reject(err); }
                var docs = [];
                var collection = db.collection('coverages');
                var cursor = collection.aggregate([{
                    $group: {
                        _id: "$git.remotes.url",
                        history: {
                            $push: "$$ROOT"
                        }
                    }
                }]);

                cursor.on('data', function(doc) {
                    docs.push(doc);
                });

                cursor.once('end', function() {
                    resolve(docs);
                    db.close();
                });
            });
        });
    }
};

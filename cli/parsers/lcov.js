const fs = require('fs');
const readline = require('readline');
const {Line, Func, objectFillingWith} = require('../data');
const {Readable} = require('stream');

async function walkFile(coverageFile) {
  let data = [];
  let pat = '';
  let lines = objectFillingWith(Line);
  let funcs = objectFillingWith(Func);

  // parsing context
  const parser = {
    'SF': f => pat = f,
    'FN': (lno, fna) => Object.assign(funcs[fna], {lno, fna}),
    'FNDA': (hit, fna) => Object.assign(funcs[fna], {hit, fna}),
    'DA': (lno, hit) => Object.assign(lines[lno], {lno, hit}),
    'BRDA': (lno, _1, _2, exec) => lines[lno].addBranch(exec),
  };

  for await (const line of coverageFile) {
    if (!line) continue;
    if (line === 'end_of_record') {
      data.push([pat, [Object.values(lines)], [Object.values(funcs)]]);
      pat = '';
      lines = objectFillingWith(Line);
      funcs = objectFillingWith(Func);
    }
    let [cmd, args] = line.split(':');
    if (parser[cmd]) parser[cmd](...args.split(','))
  }

  if (!data.length) throw Error('Failed to parse lcov');

  return data;
}

/**
 * returns a javascript object that represents the coverage data
 * @method parse
 * @param  {String|Path} file - this can either be a string or a path to a file
 * @return {Coverage} - The coverage data structure
 *
 */
async function parse(input) {
  let lines = readline.createInterface({input});

  return await walkFile(lines);
}

module.exports = {
  walkFile,
  parse
};

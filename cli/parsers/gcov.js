const zlib = require('zlib');
const {Line, Func} = require('../data');

function parseFile({file, lines, functions}) {
  try {
    return [file, lines.map(parseLine), functions.map(parseFunc)];
  } catch (e) {
    throw Error(`Error parsing coverage of file ${file} `);
  }
}

function parseLine({line_number: lno, count: hit, branches}) {
  const bct = branches.length;
  const bex = branches.reduce((acc, {count}) => acc + count, 0);

  return new Line({lno, hit, bct, bex});
}

function parseFunc({
  execution_count: hit,
  start_line: sln,
  end_line: eln,
  name,
  demangled_name,
  blocks: bct,
  blocks_executed: bex
}) {
  const fna = demangled_name || name;

  return new Func({hit, sln, eln, fna, bct, bex})
}

function walkFile(jsonString, shouldExclude) {
  const covJson = JSON.parse(jsonString);
  return covJson.files.filter(({file}) => shouldExclude(file)).map(parseFile);
}

/**
 * returns a javascript object that represents the coverage data
 * @method parse
 * @param  {NodeJS.ReadStream} input - this can either be a string or a path to
 *     a file
 * @return {Coverage} - The coverage data structure
 *
 */
async function parse(input, shouldExclude) {
  const text = await uncompressFile(input)
  return walkFile(text, shouldExclude);
}

function uncompressFile(input) {
  const chunks = [];
  return new Promise(
      (resolve, reject) =>
          input.pipe(zlib.createGunzip())
              .on('data', chunk => chunks.push(chunk))
              .on('error', reject)
              .on('end',
                  () => resolve(Buffer.concat(chunks).toString('utf-8'))))
}

module.exports = {
  walkFile,
  parse
};

const {readdirSync} = require('fs')
const {basename} = require('path')
const filename = basename(__filename)
const impls = readdirSync(__dirname)
                  .filter(f => f != filename)
                  .map(f => [f.replace(/.js$/, ''), require(`./${f}`)])

module.exports = Object.fromEntries(impls)

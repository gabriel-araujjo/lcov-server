const {Pool} = require('pg').native

const db = new Pool()

db.query(readFileSync(join(__dirname, 'sync-db.sql')))

module.exports = db

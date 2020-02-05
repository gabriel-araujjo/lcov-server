const {Pool} = require('pg').native
const {readFileSync, readdirSync} = require('fs')
const {join} = require('path')

const db = new Pool()

const migrationsDir = join(__dirname, 'migrations');

const createMigrationTable = {
  text: 'CREATE TABLE IF NOT EXISTS migration_ctrl ' +
      '(id smallint PRIMARY KEY, v int)'
};

const getDbVersion = {
  text: 'WITH new_row AS (' +
      'INSERT INTO migration_ctrl (id, v) ' +
      'VALUES (1, 0) ON CONFLICT DO NOTHING RETURNING v' +
      ') SELECT v FROM new_row UNION SELECT v FROM migration_ctrl LIMIT 1'
};

const upgradeDbVersion = v => ({
  name: 'upgradeVersion',
  text: 'UPDATE migration_ctrl SET v=$1 RETURNING v',
  values: [v]
});

async function getDatabaseVersion() {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    await client.query(createMigrationTable);
    const {rows: [{v}]} = await client.query(getDbVersion);
    await client.query('COMMIT')
    return v;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err
  }
}

function loadSql(file) {
  return readFileSync(join(migrationsDir, `${file}.sql`)).toString('utf-8');
}

async function upgrade(from, to) {
  if (from > to) return;
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    await client.query(loadSql(from));
    const {rows: [{v}]} = await client.query(upgradeDbVersion(from));
    await client.query('COMMIT')
    console.log('database upgrade to version ' + v)
  } catch (err) {
    console.error('fail upgrading database to version ' + from)
        await client.query('ROLLBACK');
    throw err
  }
  await upgrade(from + 1, to);
}

async function syncDb() {
  const migrations =
      readdirSync(migrationsDir).map(f => Number(f.replace(/\.sql$/, '')));

  const currentVersion = await getDatabaseVersion();
  const to = Math.max(migrations);

  await upgrade(currentVersion + 1, to);
  console.log('database is up-to-date');
}

syncDb().catch(err => console.error('Cannot setup database', err))

module.exports = db

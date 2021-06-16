const pg = require('pg')

const PostgresConn = async () => {

  const pgConfig = {
    user: 'postgres',
    database: 'postgres',
    password: 'postgres',
    port: 5432
  };

  var pool = new pg.Pool(pgConfig)
  const client = await pool.connect()
  return client 
}

module.exports.PostgresConn = PostgresConn
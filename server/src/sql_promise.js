import pg from 'pg'

//pg.defaults.ssl = true
let pool = null

const config = {
  //user: 'foo', //env var: PGUSER
  //database: 'my_db', //env var: PGDATABASE
  //password: 'secret', //env var: PGPASSWORD
  //port: 5432, //env var: PGPORT
  max: 100, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}

if(pool === null){
  pool = new pg.Pool(config)
  pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
  })
}


export function createSQLPromise(sql, values = []){

  let executor = (resolve, reject) => {

    pool.connect(function(err, client, done) {
      done()
      if(err) {
        console.log('error fetching client from pool')
        reject({error: `error fetching client from pool: ${err}`})
      }else{
        client.query(sql, values, function(err, result) {
          if(err) {
            console.log('error query', err)
            reject({error: `error running query: ${err}`})
          }else {
            resolve(result.rows)
          }
        })
      }
    })
  }

  return new Promise(executor)
}

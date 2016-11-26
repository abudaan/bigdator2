import sql from 'sql'
import {createSQLPromise} from '../sql_promise'
import {combined, combined2, reports} from '../defs'

export function getEconomics(start, end, name){

  let query = `SELECT gemeente,
    ROUND(AVG(woz), 0) AS woz,
    ROUND(AVG(cast(participatie as NUMERIC)), 1) AS participatie,
    ROUND(AVG(cast(inkomen as NUMERIC)), 1) AS inkomen
    FROM combined2
    WHERE jaar>=${start} AND jaar<=${end}
    GROUP BY gemeente
    ORDER BY gemeente
  ;`

  // let query = t.select(
  //   t.gemeente,
  //   sql.functions.ROUND(sql.functions.AVG(t.woz), 0).as('woz'),
  //   sql.functions.ROUND(sql.functions.AVG(t.participatie), 0).as('participatie'),
  //   sql.functions.ROUND(sql.functions.AVG(t.inkomen), 0).as('inkomen')
  // )
  // .from(t)
  // .where(
  //   (t.jaar).gte(start),
  //   (t.jaar).lte(end)
  // )
  // .group(t.gemeente)
  // .toQuery()

  return createSQLPromise(query)
}

export function getHoods(start, end, name){
  let t, query

  if(typeof name === 'undefined'){

    t = combined
    query = t.select(
      t.bu_code,
      t.name,
      sql.functions.SUM(t.meldingen).as('meldingen'),
      sql.functions.SUM(t.dumps).as('dumps'),
      sql.functions.ROUND(sql.functions.AVG(t.fillperc), 0).as('fillperc')
    )
    .from(t)
    .where(
      (t.date).gte(start),
      (t.date).lte(end)
    )
    .group(t.name, t.bu_code)
    .toQuery()

  }else{

    t = combined
    query = t.select(
      t.date,
      t.bu_code,
      t.name,
      t.meldingen,
      t.dumps,
      t.fillperc
    )
    .from(t)
    .where(
      (t.date).gte(start),
      (t.date).lte(end)
    )
    .where(
      (t.name).equals(name)
    )
    .toQuery()
  }

  return createSQLPromise(query.text, query.values)
}


export function getReports(start, end, name){

  let t = reports
  let query = t.select(
    t.name,
    t.date,
    t.identification,
    t.description,
    t.x,
    t.y
  )
  .from(t)
  .where(
    (t.date).gte(start),
    (t.date).lte(end)
  )
  .where(
    (t.name).equals(name)
  )
  .toQuery()

  return createSQLPromise(query.text, query.values)
  .then(
    result => {
      let features = []
      result.forEach(row => {
        //console.log(row)
        features.push({
          type: 'Feature',
          properties: {
            date: row.date,
            description: row.description,
            identification: row.identification
          },
          geometry: {
            type: 'Point',
            coordinates: [row.x, row.y]
          }
        })
      })
      return Promise.resolve(features)
    },
    error => {
      return Promise.reject(error)
    }
  )
}

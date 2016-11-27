import {createSQLPromise} from '../sql_promise'

export function getEconomics(start, end, name){

  let query = `SELECT
    gemeente,
    kleur,
    ROUND(AVG(woz), 0) AS woz,
    ROUND(AVG(cast(participatie as NUMERIC)), 1) AS participatie,
    ROUND(AVG(cast(inkomen as NUMERIC)), 1) AS inkomen
    FROM combined2
    WHERE jaar>=${start} AND jaar<=${end}
    GROUP BY gemeente, kleur
    ORDER BY gemeente
  ;`

  return createSQLPromise(query)
}

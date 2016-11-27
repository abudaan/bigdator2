import sql from 'sql'
import {createSQLPromise} from './sql_promise'
import fs from 'fs'

sql.setDialect('postgres')

let colors = {}

let query = 'DROP TABLE IF EXISTS combined2;\n'
query += `CREATE TABLE combined2(
  id SERIAL,
  gemeente varchar(255),
  kleur varchar(7),
  jaar INTEGER,
  woz INTEGER DEFAULT 0,
  inkomen FLOAT(1) DEFAULT 0,
  participatie FLOAT(1) DEFAULT 0
);\n`

let csv, rows

csv = fs.readFileSync('./server/data/woz_2005-2015.csv', 'utf-8')
rows = csv.split('\n')
rows.forEach(row => {
  let data = row.split(';')
  let name = data[0]
  name = name.replace('\'', '\'\'') // 's-Hertogenbosch -> ''s-Hertogenbosch
  name = name.replace(/\(.*\)/, '') // remove (L.) etc
  name = name.trim()

  let color = colors[name]
  if(typeof color === 'undefined'){
    color = '#' + ((1 << 24) * Math.random() | 0).toString(16)
    colors[name] = color
  }
  //console.log(name)
  let year = 2004
  for(let i = 1; i < data.length; i++){
    year++
    let value = data[i]
    if(isNaN(value) || value === ''){
      value = 0
    }
    // console.log(value)
    query += `INSERT INTO combined2 (gemeente, kleur, jaar, woz) VALUES ('${name}', '${color}', ${year}, ${value});\n`
  }
})


csv = fs.readFileSync('./server/data/arbeidsparticipatie_2005-2015.csv', 'utf-8')
rows = csv.split('\n')
rows.forEach(row => {
  let data = row.split(';')
  let name = data[0]
  name = name.replace('\'', '\'\'')
  name = name.replace(/\(.*\)/, '')
  name = name.trim()
  //console.log(name)
  let year = 2004
  for(let i = 1; i < data.length; i++){
    year++
    let value = data[i]
    value = value.replace(',', '.')
    if(isNaN(value) || value === ''){
      value = 0
    }else{
      value = parseFloat(value)
    }
    // console.log(value)
    query += `UPDATE combined2 SET participatie=${value} WHERE gemeente='${name}' AND jaar=${year};\n`
  }
})


csv = fs.readFileSync('./server/data/inkomen_2005-2013.csv', 'utf-8')
rows = csv.split('\n')
rows.forEach(row => {
  let data = row.split(';')
  let name = data[0]
  name = name.replace('\'', '\'\'')
  name = name.replace(/\(.*\)/, '')
  name = name.trim()
  let year = 2004
  for(let i = 1; i < data.length; i++){
    year++
    let value = data[i]
    value = value.replace(',', '.')
    //console.log(value, isNaN(value))
    if(isNaN(value) || value === ''){
      value = 0
    }else{
      value = parseFloat(value)
    }
    //console.log(name, year, value)
    query += `UPDATE combined2 SET inkomen=${value} WHERE gemeente='${name}' AND jaar=${year};\n`
  }
})


//console.log(query)

createSQLPromise(query)
.then(
  data => {
    //console.log(data)
  },
  error => {
    console.error(error)
  }
)

import {config} from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import {apolloExpress, graphiqlExpress} from 'apollo-server'
import schema from './apollo/schema'

config()

const app = express()
app.use('/', express.static('./frontend'));

app.use('/graphql', bodyParser.json(), apolloExpress({schema}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

process.on('exit', function (){
  console.log('Goodbye!')
})

//let port = process.env.PORT || 5000
let port = 5002
/*
  nginx:

  server {
    server_name app2.bigdator.nl;
    location / {
      proxypass http://127.0.0.1:5002
    }
  }
*/
app.listen(port, 'localhost', () => {
  console.log(`server listening at port ${port}`)
})

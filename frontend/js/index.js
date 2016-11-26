import 'babel-polyfill'
import App from './containers/app'
import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import Client from './apollo/apollo_client'

window.onload = function(){
  ReactDOM.render(
    <ApolloProvider client={Client}>
      <App/>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

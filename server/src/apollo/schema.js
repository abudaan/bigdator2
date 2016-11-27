import {makeExecutableSchema} from 'graphql-tools'
import Economic from './economic.js'
import {getEconomics} from './get_data.js'

const RootQuery = `
  type RootQuery {
    economics(start: Int, end: Int, name: String): [Economic],
  }
`

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`

const resolvers = {
  RootQuery: {
    economics: (root, {start, end, name}) => {
      console.log('economics:', start, end, name)
      return getEconomics(start, end, name)
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Economic],
  resolvers,
  resolverValidationOptions: {
    requireResolversForNonScalar: false
  }
})

export default schema

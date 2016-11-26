import {makeExecutableSchema} from 'graphql-tools';
import Hood from './hood.js';
import Economic from './economic.js';
import Report, {Geometry, Properties} from './report.js'
import {getHoods, getReports, getEconomics} from './get_data.js';

const RootQuery = `
  type RootQuery {
    hello(count: Int): String,
    economics(start: Int, end: Int, name: String): [Economic],
    hoods(start: String, end: String, name: String): [Hood],
    reports(start: String, end: String, name: String): [Report],
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

//let count = 0
const resolvers = {
  RootQuery: {
    hello: (root, {count}) => {
      console.log(count)
      //count = 1
      let string = ''
      for(let i = 0; i < count; i++){
        string += 'Hello, world!\n'
      }
      return string
    },
    hoods: (root, {start, end, name}) => {
      console.log('hoods:', start, end, name)
      return getHoods(start, end, name)
    },
    reports: (root, {start, end, name}) => {
      console.log('reports:', start, end, name)
      return getReports(start, end, name)
    },
    economics: (root, {start, end, name}) => {
      console.log('economics:', start, end, name)
      return getEconomics(start, end, name)
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, Economic, Hood, Report, Geometry, Properties],
  resolvers,
});

export default schema

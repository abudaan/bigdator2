import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

// Initialize GraphQL queries or mutations with the `gql` tag
const GetGreetings = gql`
  query hello($count: Int!){
    hello(count: $count)
  }
`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") }`;

@graphql(GetGreetings,
  {
    options: ({count}) => ({variables: {count}})
  }
)
class TestComp extends Component {
  render() {
    return <div>{this.props.data.hello}</div>;
  }
}

export default TestComp


// export default graphql(
//   GetGreetings, {
//     options: ({count}) => ({variables: {count}}),
//   })(TestComp);


//export default Test
// export default graphql(GetGreetings, {
//   options: { variables: { count: 100 } },
// })(TestComp);
//



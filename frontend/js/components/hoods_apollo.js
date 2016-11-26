import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

// Initialize GraphQL queries or mutations with the `gql` tag
const GetHoods = gql`
  query hoods($start: String!, $end: String!, $name: String){
    hoods(start: $start, end: $end, name: $name){
      bu_code,
      dumps,
      fill_perc,
      meldingen,
      name
    }
  }
`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") }`;

@graphql(GetHoods,
  {
    options: ({start, end, name}) => ({variables: {start, end, name}})
  }
)
class HoodsApollo extends Component {
  render() {
    console.log('render', this.props.data)
    if(this.props.data.loading === true){
      return <div>{'loading...'}</div>
    }else if(typeof this.props.data.error !== 'undefined'){
      return <div>{this.props.data.error.message}</div>
    }else if(this.props.data.loading === false){
      let divs = []
      this.props.data.hoods.forEach(hood => {
        divs.push(<div key={hood.bu_code}>{hood.name}</div>)
      })
      return <div>{divs}</div>
    }

    return null
  }
}

export default HoodsApollo


// export default graphql(
//   GetGreetings, {
//     options: ({count}) => ({variables: {count}}),
//   })(TestComp);


//export default Test
// export default graphql(GetGreetings, {
//   options: { variables: { count: 100 } },
// })(TestComp);
//



import React, {Component}from 'react'
import Slider from '../components/date_slider'
import Select from '../components/select'

class Controls extends Component{

  static displayName = 'Controls'

  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {
    let options = []
    // this.props.visualisations.options.forEach(option => {
    //   options.push(<Select {...option} key={option.id} onChange={this.props.visualisations.onSelect} />)
    // })

    let name = this.props.dateSlider.name
    if(name === null){
      name = 'Alle gemeenten'
    // }else{
    //   name = name.replace("''", "'")
    }

    return (
      <div>
        <Slider
          {...this.props.dateSlider}
        />
        {options}
        <h1>{name}</h1>
      </div>
    )

  }
}

export default Controls

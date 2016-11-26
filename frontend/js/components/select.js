import React from 'react'

let labelStyle = {
  width: '170px',
  height: '1.9em',
  display: 'inline-block'
}

let inputStyle = {
  verticalAlign: 'middle',
  //marginBottom: '5px',
  width: '500px'
}

class Select extends React.Component{

  static displayName = 'Select'

  constructor(props){
    super(props)
  }

  render(){

    let id = `checkbox_${this.props.id}`

    let createLabel = (label) => {
      return {__html: label}
    }
    //console.log(this.props)

    return (
      <div>
        <label htmlFor={id} style={labelStyle} dangerouslySetInnerHTML={createLabel(this.props.label)} />
        <input
          type={'checkbox'}
          id={id}
          onChange={this.props.onChange}
          defaultChecked={this.props.selected}
        />
      </div>
    )
  }
}


Select.propTypes = {
  // id: React.PropTypes.string,
  // max: React.PropTypes.number.isRequired,
  // min: React.PropTypes.number.isRequired,
  // onChange: React.PropTypes.func.isRequired,
  // onMouseDown: React.PropTypes.func.isRequired,
  // onMouseUp: React.PropTypes.func.isRequired,
  // step: React.PropTypes.number.isRequired,
  // type: React.PropTypes.string.isRequired,
  // startValue: React.PropTypes.number.isRequired,
  // endValue: React.PropTypes.number.isRequired,
  // startLabel: React.PropTypes.string.isRequired,
  // endLabel: React.PropTypes.string.isRequired,
}

export default Select


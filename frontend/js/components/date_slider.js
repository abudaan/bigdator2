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

const onChange = function(e){

  let {id, valueAsNumber} = e.target
  let {
    startValue,
    endValue,
    min,
    max,
    minDiff,
  } = this.props

  if(id === 'date_range_start'){
    if(valueAsNumber === max - minDiff + 1){
      startValue = max - minDiff
    }else{
      startValue = valueAsNumber
      if(startValue >= endValue - minDiff){
        endValue = startValue + minDiff
      }
    }
  }else if(id === 'date_range_end'){
    if(valueAsNumber === min + minDiff - 1){
      endValue = minDiff + minDiff
    }else{
      endValue = valueAsNumber
      if(endValue <= startValue + minDiff){
        startValue = endValue - minDiff
      }
    }
  }
  //console.log(startValue, endValue, min, max)

  this.props.onChange({startValue, endValue})
}

class DateSlider extends React.Component{

  static displayName = 'DateSlider'

  constructor(props){
    super(props)
    this.onChange = onChange.bind(this)
  }

  render(){

    let id = this.props.id || this.props.type

    let createLabel = (label) => {
      return {__html: label}
    }

    return (
      <div>
        <label htmlFor={id} style={labelStyle} dangerouslySetInnerHTML={createLabel('Start jaar: ' + this.props.startLabel)} />
        <input
          style={inputStyle}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
          id={`${id}_start`}
          key={`${id}_start`}
          onChange={this.onChange}
          type="range"
          value={`${this.props.startValue}`}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
        <br />
        <label htmlFor={id} style={labelStyle} dangerouslySetInnerHTML={createLabel('Eind jaar: ' + this.props.endLabel)} />
        <input
          style={inputStyle}
          onMouseUp={this.props.onMouseUp}
          onMouseDown={this.props.onMouseDown}
          id={`${id}_end`}
          key={`${id}_end`}
          onChange={this.onChange}
          type="range"
          value={`${this.props.endValue}`}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
      </div>
    )
  }
}


DateSlider.propTypes = {
  id: React.PropTypes.string,
  max: React.PropTypes.number.isRequired,
  min: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onMouseDown: React.PropTypes.func.isRequired,
  onMouseUp: React.PropTypes.func.isRequired,
  step: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  startValue: React.PropTypes.number.isRequired,
  endValue: React.PropTypes.number.isRequired,
  startLabel: React.PropTypes.string.isRequired,
  endLabel: React.PropTypes.string.isRequired,
}

export default DateSlider


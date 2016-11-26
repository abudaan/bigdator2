import React, {Component}from 'react'

class Other extends Component{

  static displayName = 'Other'

  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {
    let style = {
      float: 'left',
      width: 600,
      height: 600,
      outline: 'dotted #ccc 1px',
      backgroundImage: 'url(img/uil.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      margin: 20,
    }
    let styleImg = {
      verticalAlign: 'middle',
      textAlign: 'center',
      display: 'inline',
      //display: 'block',
      //margin: 'auto 0',
    }
    //return <div className={'visualisation'} style={style}>{'&nbsp;'}</div>
    //return <div style={style}><img style={styleImg} src={'img/uil.jpg'} /></div>
    return <div style={style}></div>
  }
}

export default Other

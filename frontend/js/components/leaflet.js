import React, {Component, PropTypes}from 'react'
import L from 'leaflet'
import * as topojson from 'topojson-client'


function _createMap(data){
  let inverted = {}
  Object.keys(data).forEach(key => {
    inverted[data[key]] = key
  })
  // console.log(inverted)
  return inverted
}


class Leaflet extends Component {

  static displayName = 'Leaflet'

  static propTypes = {
    data: PropTypes.object,
    maxZoom: PropTypes.number.isRequired,
    municipality: PropTypes.string,
    onClick: PropTypes.func,
    show: PropTypes.bool,
    update: PropTypes.bool,
    zoom: PropTypes.number.isRequired,
  }

  constructor(){
    super()
    this.style = {
      weight: 0.1,
      opacity: 1,
      color: 'black',
      fillColor: 'red',
      fillOpacity: 0
    }
    this.borders = null
    this.popup = L.popup()
  }


  componentDidMount(){
    //console.log('componentDidMount')
    this.map = L.map('leaflet')
    let tiles = L.tileLayer(
      '//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="//openstreetmap.org">OpenStreetMap</a> contributors',
        minZoom: 1,
        maxZoom: 10
      }
    )
    tiles.addTo(this.map)
  }


  componentWillUpdate(){
    //console.log('componentWillUpdate')
  }


  componentDidUpdate(prevProps){
    //console.log('componentDidUpdate', prevProps, this.props)

    if(this.props.data !== null && this.borders === null){
      // this.borders = L.geoJson(this.props.data, {
      //   style: this.style,
      //   onEachFeature: this.onEachFeature.bind(this),
      // })
      this.propertyMap = _createMap(this.props.data.objects.collection.map)
      this.borders = L.geoJson(topojson.feature(this.props.data, this.props.data.objects.collection), {
        style: this.style,
        onEachFeature: this.onEachFeature.bind(this),
      })
      this.borders.addTo(this.map)
      this.map.fitBounds(this.borders.getBounds())
    }
    if(this.props.update === true){
      this._reset(prevProps.municipality)

      if(this.props.municipality === null){
        this.map.fitBounds(this.borders.getBounds())
      }else{
        this.borders.eachLayer(layer => {
          let name = layer.feature.properties[this.propertyMap.gemeentena]
          if(name === this.props.municipality) {
            layer.off('mouseover')
            layer.off('mouseout')
            layer.setStyle({
              fillColor: 'blue',
              fillOpacity: 0.5,
            })
            this.map.fitBounds(layer.getBounds())
          }
        })
      }
    }
  }


  componentWillUnmount(){
    this.map.remove()
  }


  _reset(prevName){
    if(prevName === null){
      return
    }

    this.borders.eachLayer(layer => {
      let name = layer.feature.properties[this.propertyMap.gemeentena]
      if(name === prevName) {
        layer.setStyle({
          weight: 0.1,
          fillColor: '#f00',
          fillOpacity: 0,
        })
        layer.on({
          mouseover: this._onMouseOver.bind(this),
          mouseout: this._onMouseOut.bind(this),
        })
      }
    })
  }


  _onMouseOver(e){
    e.target.setStyle({
      weight: 0.5,
      color: '#f00',
      fillOpacity: 0.3,
    })
    if(!L.Browser.ie && !L.Browser.opera){
      e.target.bringToFront()
    }
    let name = e.target.feature.properties[this.propertyMap.gemeentena]
    this.popup
    .setLatLng(e.latlng)
    .setContent(`<p>${name}</p>`)
    .openOn(this.map);
  }


  _onMouseOut(e){
    e.target.setStyle({
      weight: 0.1,
      color: '#000',
      fillOpacity: 0,
    })
    this.map.closePopup()
  }


  onEachFeature(feature, layer){
    layer.on({
      mouseover: this._onMouseOver.bind(this),
      mouseout: this._onMouseOut.bind(this),
      click: e => {
        let name = e.target.feature.properties[this.propertyMap.gemeentena]
        this.props.onClick(name)
      }
    })
  }


  render() {
    if(this.props.show !== true){
      return null
    }
    return (<div>
      <span className="visualisation" id="leaflet"/>
    </div>)
  }
}

export default Leaflet

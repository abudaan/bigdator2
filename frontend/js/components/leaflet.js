import React, {Component, PropTypes}from 'react'
import L from 'leaflet'
import * as topojson from 'topojson-client'


class Leaflet extends Component {

  static displayName = 'Leaflet'

  static propTypes = {
    data: PropTypes.object,
    zoom: PropTypes.number.isRequired,
//    maxZoom: PropTypes.number.isRequired,
  }

  constructor(){
    super()
    this.style = {
      weight: 0.1,
      opacity: 1,
      color: 'black',
      fillColor: 'black',
      fillOpacity: 0.1
    }
    this.hoods = null
  }


  componentDidMount(){
    //console.log('componentDidMount')
    this.map = L.map('leaflet')
    let tiles = L.tileLayer(
      '//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="//openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
      }
    )
    tiles.addTo(this.map)
  }


  componentWillUpdate(){
    //console.log('componentWillUpdate')
  }


  componentDidUpdate(oldProps){
    //console.log('componentDidUpdate', oldProps, this.props)
    //console.log(topojson)
    //console.log('hoods', this.hoods)
    if(this.props.data !== null && this.hoods === null){
      //console.log(1)
      this.hoods = L.geoJson(topojson.feature(this.props.data, this.props.data.objects.collection), {
        style: this.style,
        onEachFeature: this.onEachFeature.bind(this),
      })
      this.hoods.addTo(this.map)
      this.map.fitBounds(this.hoods.getBounds())
    }
    if(this.hoods !== null && oldProps.zoom !== this.props.zoom){
      //console.log(2)
      this.map.fitBounds(this.hoods.getBounds())
    }
  }


  componentWillUnmount(){
    this.map.remove()
  }


  onEachFeature(feature, layer){
    //console.log(layer)
    layer.on({
      mouseover: e => {
        e.target.setStyle({
          weight: 0.5,
          color: '#f00',
        })
        if (!L.Browser.ie && !L.Browser.opera) {
          e.target.bringToFront()
        }
      },
      mouseout: e => {
        e.target.setStyle({
          weight: 0.1,
          color: '#000',
        })
      },
      click: e => {
        console.log(e.target.feature.properties.GM_NAAM)
        //this.props.onClick(e)
      }
    })
  }


  render() {
    return (<div>
      <span className="leaflet-react" />
    </div>)
  }
}

export default Leaflet

import React, {Component}from 'react'
import topojson from 'topojson'
//import L from 'leaflet'
//import {Map, Marker, Popup, TileLayer, GeoJson} from 'react-leaflet'

const L = window.L // ugly as hell
const MarkerClusterGroup = L.markerClusterGroup
let r = 0

class Containers extends Component{

  constructor(props){
    super()

    this.icon = L.icon({
      iconUrl: 'img/afval.png',
    })

    let {map, data} = props

    this.containers = L.geoJson(data, {
      filter: (feature, layer) => {
        return feature.properties.soort
      },
      pointToLayer: (feature, latlng) => {
        let marker = L.marker(latlng, {icon: this.icon})
        marker.bindPopup(feature.properties.soort)
        return marker
      }
    })

    //this.group = new MarkerClusterGroup()
    //this.group.addLayer(this.containers)
  }


  componentDidMount() {
  }


  render() {
    let {map, zoomLevel} = this.props

    if(zoomLevel === null || zoomLevel < 14){
      //map.removeLayer(this.group)
      if(map.hasLayer(this.containers)){
        map.removeLayer(this.containers)
      }
    }else{
      //this.group.addTo(map)
      if(map.hasLayer(this.containers) === false){
        map.addLayer(this.containers)
      }
    }
    //console.log(`%cconstainers: ${++r}`, 'color: #1BB2E0; font-weight: bold;')
    return null
  }
}

export default Containers

import React, {Component}from 'react'
import topojson from 'topojson'
//import L from 'leaflet'
//import {Map, Marker, Popup, TileLayer, GeoJson} from 'react-leaflet'

const L = window.L // ugly as hell
const MarkerClusterGroup = L.markerClusterGroup
let r = 0

class Schools extends Component{

  constructor(props){
    super()

    this.icon = L.icon({
      iconUrl: 'img/school.png',
    })

    let {map, data} = props

    this.schools = L.geoJson(data, {
      filter: (feature, layer) => {
        return feature.properties.VESTIGINGSNAAM
      },
      pointToLayer: (feature, latlng) => {
        let marker = L.marker(latlng, {icon: this.icon})
        marker.bindPopup(feature.properties.VESTIGINGSNAAM)
        return marker
      }
    })

    //this.group = new MarkerClusterGroup()
    //this.group.addLayer(this.schools)
  }


  componentDidMount() {
  }


  render() {

    let {map, zoomLevel} = this.props

    if(zoomLevel === null || zoomLevel < 14){
      //map.removeLayer(this.group)
      if(map.hasLayer(this.schools) === true){
        map.removeLayer(this.schools)
      }
    }else{
      //this.group.addTo(map)
      if(map.hasLayer(this.schools) === false){
        map.addLayer(this.schools)
      }
    }

    //console.log(`%cschools: ${++r}`, 'color: #1BB2E0; font-weight: bold;')
    return null
  }
}

export default Schools

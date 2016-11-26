import React, {Component}from 'react'
import topojson from 'topojson'
import {graphql, connect} from 'react-apollo';
import gql from 'graphql-tag';
//import L from 'leaflet'
//import {Map, Marker, Popup, TileLayer, GeoJson} from 'react-leaflet'

const L = window.L // ugly as hell
const MarkerClusterGroup = L.markerClusterGroup



const GetReports = gql`
  query reports($start: String!, $end: String!, $name: String){
    reports(start: $start, end: $end, name: $name){
      type,
      geometry {
        type,
        coordinates
      },
      properties {
        date,
        description,
        identification
      }
    }
  }
`;
@graphql(GetReports, {
  options: ({start, end, name}) => ({variables: {start, end, name}})
})
class Reports extends Component{

  constructor(props){
    super()

    this.icon = L.icon({
      iconUrl: 'img/melding.png',
    })

    this.iconHighlight = L.icon({
      iconUrl: 'img/meldinghighlight.png',
    })


    this.reports = L.geoJson(null, {
      filter: (feature, layer) => {
        return feature.properties.description
      },
      pointToLayer: (feature, latlng) => {
        //console.log(feature)
        let marker = L.marker(latlng, {icon: this.icon})
        let desc = feature.properties.description.split(';')
        marker.bindPopup(`<p><strong>${desc[0]}</strong><br />${(desc[1] ? desc[1] : '')}<hr />${feature.properties.date.substring(0, 10)}`)
        return marker
      }
    })

    this.group = new MarkerClusterGroup()
  }


  componentDidMount() {
  }


  render() {

    let {map, data, hoodId} = this.props
    //console.log(data.reports)

    if(hoodId === null || !data.reports){
      this.group.clearLayers()
      this.reports.clearLayers()
      this.group.removeLayer(this.reports)
      map.removeLayer(this.group)
    }else{
      let d = {
        type: 'FeatureCollection',
        features: data.reports
      }
      //console.log(d)
      this.group.clearLayers()
      this.reports.clearLayers()
      this.group.removeLayer(this.reports)
      this.reports.addData(d)
      // map.fitBounds(this.reports.getBounds())
      this.group.addLayer(this.reports)
      this.group.addTo(map)
    }

    //console.log(`%creports: ${++r}`, 'color: #1BB2E0; font-weight: bold;')
    return null
  }
}

export default Reports

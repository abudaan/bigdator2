import React, {Component}from 'react'
import topojson from 'topojson'
import L from 'leaflet'
import {Map, Marker, Popup, TileLayer, GeoJSON} from 'react-leaflet'

let r = 0

class Hoods extends Component{

  constructor(props){
    super()
    this.style = {
      weight: 1,
      opacity: 1,
      color: 'black',
      fillColor: 'black',
      fillOpacity: 0.1
    }

    let {map, data} = props

    // this.popup = L.popup()
    //   .setLatLng([0, 0])
    //   .setContent('aap')
    //   .openOn(map)

    // this.hoods = L.geoJson(data, {
    //   style: this.style,
    //   onEachFeature: this.onEachFeature.bind(this)
    // })

    // this.hoods.addTo(map)

    // map.fitBounds(this.hoods.getBounds())
    // this.hoods.eachLayer(layer => {
    //   if(layer._path){
    //     layer._path.setAttribute('title', layer.feature.properties.name);
    //   }else{
    //     layer.eachLayer(noncontig => {
    //       noncontig._path.setAttribute('title', layer.feature.properties.name);
    //     })
    //   }
    // })
  }


  componentDidMount() {
    // setTimeout(() => {
    //   this.props.onLoad(this.hoods.getBounds())
    // }, 0)
  }


  onEachFeature(feature, layer){
    //console.log(layer)

    layer.on({
      mouseover: e => {
        e.target.setStyle({
          weight: 3,
          color: '#fff',
        })
        if (!L.Browser.ie && !L.Browser.opera) {
          e.target.bringToFront()
        }
        console.log(feature, e)
        this.popup.setLatLng(e.latlng)
        this.popup.setContent(`${feature.properties.GM_NAAM} \n ${feature.properties.AANT_INW}`)
      },
      mouseout: e => {
        e.target.setStyle({
          weight: 1,
          color: '#000',
        })
      },
      click: e => {
        //console.log(e.target.feature.properties.name)
        //this.props.onClick(e)
      }
    })
  }


  render() {
    console.log(this.props)
    return (
      <Map zoom={this.props.zoom} center={[-25.773301, 28.238877]}>
        <TileLayer
          attribution="<a href='//openstreetmap.org\'>OpenStreetMap</a> contributors"
          url="//{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        />
      </Map>
    );
  }
}

export default Hoods

import React, {Component}from 'react'
import L from 'leaflet'
import {Map, TileLayer, GeoJSON} from 'react-leaflet'


class Leaflet extends Component {

  onPointToLayer (feature, latlng) {
    console.log(feature)
    let marker =
    L.circleMarker(latlng, {
      radius: 8,
      color: 'red',
    })
    marker.on('click', () => {
      console.log(feature.properties.id)
    })
    return marker
    // return <CircleMarker
    //   center={latlng}
    //   radius={8}
    //   color={'red'}
    //   fillColor={'red'}
    //   fillOpacity={0.85}
    // />
  }

  render() {
    console.log('render')
    let geoJSON = null
    if(this.props.data !== null){
      geoJSON = <GeoJSON
        data={this.props.data}
        pointToLayer={this.onPointToLayer}
      />
    }
    return (
      <Map zoom={this.props.zoom} maxZoom={this.props.maxZoom} fitBounds={geoJSON !== null}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {geoJSON}
      </Map>
    );
  }
}

export default Leaflet

import React, {Component}from 'react'
import {Container} from 'flux/utils'
import Controls from '../components/controls'
import Leaflet from '../components/leaflet'
import ScatterPlot from '../components/scatter_plot'
import Other from '../components/other'
import UIStore from '../flux/ui_store'
import MapStore from '../flux/map_store'
import ControlStore from '../flux/control_store'
import ScatterPlotStore from '../flux/scatter_plot_store'
import Actions from '../flux/actions'
import {formatDate} from '../util'
import Client from '../apollo/apollo_client'
import ApolloClient from 'apollo-client'


/**
 * Main React entry point
 *
 * @class      App (name)
 */
class App extends Component{

  static displayName = 'App'

  static getStores() {
    return [UIStore, MapStore, ControlStore, ScatterPlotStore]
  }

  static calculateState(prevState){

    console.log('[APOLLO]', Client.store.getState())

    let uiState = UIStore.getState()
    let mapState = MapStore.getState()
    let controlState = ControlStore.getState()
    let scatterPlotState = ScatterPlotStore.getState()

    console.group('state')
    console.log('[map]%O', mapState)
    console.log('[control]%O', controlState)
    console.log('[ui]%O', uiState)
    console.log('[scatter plot]%O', scatterPlotState)
    console.groupEnd('state')

    let initializing = false

    // if(mapState.map === null && mapState.mapData === null){
    //   initializing = true
    // }

    //console.log(prevState)

    let start
    let end

    if(controlState.dateSlider.update === true){
      start = controlState.dateSlider.startValue
      end = controlState.dateSlider.endValue
    }else if(prevState !== null){
      start = prevState.scatterPlotState.start
      end = prevState.scatterPlotState.end
    }

    //console.log(start, end)

    return {
      // decide which panels to show and where they should be positioned
      initializing,
      selected: uiState.selected,
      visualisations: {
        options: [...uiState.options],
        onSelect: Actions.selectComponent,
      },
      dateSlider: {
        ...controlState.dateSlider,
        onChange: Actions.changeDateRange,
        onMouseUp: Actions.updateDateRange,
        onMouseDown: () => {},
      },
      mapState: {
        ...mapState,
        start,
        end,
        name: mapState.hoodName,
        onZoom: Actions.onMapZoom,
        selectHood: Actions.selectHood,
        storeBounds: Actions.storeBounds,
      },
      scatterPlotState: {
        ...scatterPlotState,
        start,
        end,
        name: mapState.hoodName,
        hoodId: mapState.hoodId,
        onClick: Actions.selectHood,
        // style: {
        //   top: 600
        // }
      },
      //date: new Date().getTime(),
    }
  }

  constructor(props){
    super(props)
    this.visualisations = new Map()
  }

  componentWillMount() {
    this.state.visualisations.options.forEach(option => {
      let element = document.getElementById(option.id)
      //console.log(element)
      if(element !== null){
        this.visualisations.set(option.id, element)
      }
    })
  }

  componentDidMount() {
    Actions.init()
  }

  _hideElement(element){
    element.style.position = 'absolute'
    element.style.left = '-5000px'
  }

  _showElement(element){
    element.style.position = 'relative'
    element.style.left = 'auto'
  }

  render() {

    return (
      <div>
        <Controls dateSlider={this.state.dateSlider} visualisations={this.state.visualisations} />
        <Leaflet
          data={this.state.mapState.data}
          zoom={this.state.mapState.zoom}
          key={'leaflet'}
        />
        <ScatterPlot
          {...this.state.scatterPlotState}
          key={'scatter_plot'}
        />
      </div>
    )
  }
}

export default Container.create(App)

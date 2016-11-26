import AppDispatcher from './app_dispatcher'
import settings from '../settings'
import * as Constants from './constants'
import {fetchJSON, fetchJSONFiles2} from '../fetch_helpers'
import api from '../api'
import {formatDate} from '../util'
import UIStore from '../flux/ui_store'
import MapStore from '../flux/map_store'
import ControlStore from '../flux/control_store'
import ScatterPlotStore from '../flux/scatter_plot_store'

const L = window.L // ugly as hell

// const loadData = function(){

//   let controlState = ControlStore.getState()
//   let start = formatDate(controlState.dateSlider.startValueMillis, 'y-mm-dd')
//   let end = formatDate(controlState.dateSlider.endValueMillis, 'y-mm-dd')

//   let mapState = MapStore.getState()
//   let name = mapState.hoodName
//   let hoodId = mapState.hoodId

//   if(hoodId !== null){
//     api.loadReportData({start, end, name: mapState.hoodName})
//     .then(
//     json => {
//       AppDispatcher.dispatch({
//         type: Constants.REPORT_DATA_LOADED,
//         payload: {
//           reports: json
//         }
//       })
//     },
//     error => {
//       console.log(error)
//     })
//   }


//   let uiState = UIStore.getState()
//   let index = uiState.selected.findIndex(n => {
//     return n === 'scatter_plot'
//   })

//   if(index !== -1){
//     let data = {start, end, agg: true}

//     if(hoodId !== null){
//       data = {start, end, name, agg: false}
//     }

//     api.loadScatterPlotData(data)
//     .then(
//     json => {
//       AppDispatcher.dispatch({
//         type: Constants.SCATTER_PLOT_DATA_LOADED,
//         payload: {
//           data: json
//         }
//       })
//     },
//     error => {
//       console.log(error)
//     })
//   }
// }


export default {
  init(){
    fetchJSONFiles2(settings.mapData, settings.baseUrl)
    .then(
      data => {
        AppDispatcher.dispatch({
          type: Constants.INITIALIZED,
          payload: {
            data,
          }
        })
      }
    )
  },

  changeDateRange(payload){
    AppDispatcher.dispatch({
      type: Constants.CHANGE_DATE_RANGE,
      payload
    })
  },

  updateDateRange(){
    AppDispatcher.dispatch({
      type: Constants.DATE_RANGE_UPDATED,
    })
  },


  selectHood(e){
    let id, name
    if(typeof e.target !== 'undefined'){
      id = e.target.feature.id
      name = e.target.feature.properties.name
    }else{
      id = `${e.bu_code}`
      name = e.name
    }
    AppDispatcher.dispatch({
      type: Constants.ZOOM_TO_HOOD,
      payload: {id, name}
    })
  },


  storeBounds(bounds){
    AppDispatcher.dispatch({
      type: Constants.STORE_BOUNDS,
      payload: {bounds}
    })
  },


  onMapZoom(e){
    AppDispatcher.dispatch({
      type: Constants.ZOOMLEVEL_MAP_CHANGED,
      //payload: {zoom: e.target._zoom}
    })
  },


  selectComponent(e){
    let id = e.target.id.replace('checkbox_', '')
    AppDispatcher.dispatch({
      type: Constants.SELECT_COMPONENT,
      payload: {id}
    })
  },
}

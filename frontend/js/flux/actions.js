import AppDispatcher from './app_dispatcher'
import settings from '../settings'
import * as Constants from './constants'
import {fetchJSONFiles2} from '../fetch_helpers'

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


  selectMunicipality(name){
    AppDispatcher.dispatch({
      type: Constants.ZOOM_TO_HOOD,
      payload: {name}
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

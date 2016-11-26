import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as constants from '../flux/constants'


class MapStore extends ReduceStore{

  getInitialState(){
    return {
      data: null,
      zoom: 9,
      maxZoom: 18,
    }
  }

  reduce(state, action) {

    switch(action.type){

      case constants.INITIALIZED:
        return {
          ...state,
          data: action.payload.data.jsonFiles.hoods,
        }

      case constants.ZOOMLEVEL_MAP_CHANGED:
        //console.log(state.map.getZoom())
        return {
          ...state,
          zoom: state.map.getZoom(),
        }

      default:
        return state
    }
  }
}

export default new MapStore(AppDispatcher)

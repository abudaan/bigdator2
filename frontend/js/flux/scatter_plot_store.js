import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as contants from '../flux/constants'
import settings from '../settings'

class ScatterPlotStore extends ReduceStore{

  getInitialState(){

    return {
      title: 'Scatter plot',
      width: 500,
      height: 500,
      margins: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
      },
      loading: false,
      update: false,
      start: settings.start,
      end: settings.end,
    }
  }

  reduce(state, action) {

    switch(action.type){

      case contants.CHANGE_DATE_RANGE:
        return {
          ...state,
          start: action.payload.start,
          end: action.payload.end,
        }

      default:
        return state
    }
  }
}

export default new ScatterPlotStore(AppDispatcher)

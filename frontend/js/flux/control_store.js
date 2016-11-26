import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as constants from '../flux/constants'
import settings from '../settings'
import {formatDate} from '../util'


class ControlStore extends ReduceStore{

  getInitialState(){
    let min = settings.min
    let max = settings.max
    let start = settings.start
    let end = settings.end
    let startValue = start
    let endValue = end

    return {
      dateSlider: {
        startValue,
        endValue,
        startLabel: '' + start,
        endLabel: '' + end,
        min,
        max,
        start,
        end,
        step: 1,
        minDiff: 0,
        type: 'date_range', // should be a constant
        id: 'date_range',
        label: 'select a date range',
      }
    }
  }

  reduce(state, action) {

    switch(action.type){

      case constants.CHANGE_DATE_RANGE:
        let {startValue, endValue} = action.payload
        return {
          ...state,
          dateSlider: {
            ...state.dateSlider,
            startValue,
            endValue,
            startLabel: '' + startValue,
            endLabel: '' + endValue,
          }
        }

      case constants.DATE_RANGE_UPDATED:
        return {
          ...state,
        }

      default:
        return state
    }
  }
}

export default new ControlStore(AppDispatcher)

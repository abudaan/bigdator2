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
      colors: {
        6060309: '#e30613',
        6060608: '#fbb900',
        6060904: '#4c2583',
        6060202: '#b3b2b2',
        6060906: '#479756',
        6060105: '#e6007e',
        6060905: '#616151',
        6060305: '#a3c3b5',
        6060303: '#ef7900',
        6060103: '#00266e',
        6060602: '#2bb989',
        6060000: '#59127a',
        6060907: '#006fb9',
        6060603: '#94c356',
        6060607: '#d8a165',
        6060104: '#7180cb',
        6060101: '#b80000',
        6060703: '#e9c913',
        6060201: '#ff8400',
        6060402: '#b283ab',
        6060702: '#a1a1a1',
        6060404: '#737898',
        6060902: '#95daee',
        6060102: '#8573b2',
        6060301: '#a75e10',
        6060606: '#cbae08',
        6060106: '#326592',
        6060908: '#a95e85',
        6060403: '#a37902',
        6060903: '#3d6b00',
        6060704: '#47bdb1',
        6060302: '#bf670d',
        6060307: '#7b9ebc',
        6060308: '#a3c3b5',
        6060203: '#6ebb99',
        6060306: '#323232',
        6060304: '#5b69c1',
        6060901: '#025e06',
        6060107: '#ffb76d',
        6060401: '#bf9ba5'
      }
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

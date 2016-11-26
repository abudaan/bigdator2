import {ReduceStore} from 'flux/utils'
import AppDispatcher from './app_dispatcher'
import * as constants from '../flux/constants'
import settings from '../settings'


const selectOptions = function(options, selection){
  options.forEach(option => {
    let index = selection.findIndex(value => {
      return value === option.id
    })
    if(index !== -1){
      option.selected = true
    }else{
      option.selected = false
    }
  })
  return options
}

class UIStore extends ReduceStore{

  getInitialState(){

    let selected = ['leaflet']
    let options = [
      {
        id: 'leaflet',
        label: 'Leaflet',
      },
      {
        id: 'scatter_plot',
        label: 'Scatter plot',
      },
      {
        id: 'other',
        label: 'Another visualisation',
      },
    ]

    return {
      selected,
      options: selectOptions(options, selected),
    }
  }

  reduce(state, action) {

    switch(action.type){

      case constants.SELECT_COMPONENT:
        let selected = [...state.selected]
        let id = action.payload.id
        let index = selected.findIndex(value => {
          return value === id
        })
        if(index === -1){
          selected.push(id)
        }else{
          selected.splice(index, 1)
        }
        return {
          ...state,
          selected,
          options: selectOptions(state.options, selected)
        }

      default:
        return state
    }
  }
}

export default new UIStore(AppDispatcher)

import fetch from 'isomorphic-fetch'
import {fetchJSON, fetchJSONFiles2} from './fetch_helpers'
import settings from './settings'

const loadReportData = function(data){
  let url = settings.serverUrl + '/meldingen/?'
  url += `start=${data.start}&`
  url += `end=${data.end}&`
  url += `name=${data.name}`
  return fetchJSON(url)
}

const loadScatterPlotData = function(data){
  let url = settings.serverUrl + '/buurten/?'
  url += `start=${data.start}&`
  url += `end=${data.end}&`
  url += `agg=${data.agg}`
  if(data.name){
    url += `&name=${data.name}`
  }
  return fetchJSON(url)
}

export default {
  loadReportData,
  loadScatterPlotData,
}

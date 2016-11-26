
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

const addLeadingZeros = function(value){
  if(value < 10){
    return `0${value}`
  }
  return `${value}`
}

export const formatDate = function(millis, format = 'dMy'){
  let d = new Date(millis)
  let year = d.getUTCFullYear()
  let month = d.getUTCMonth()
  let date = d.getUTCDate()

  switch(format){
    case 'dMy':
      return `${date} ${months[month]} ${year}`

    case 'd-m-y':
      return `${date}-${month + 1}-${year}`

    case 'y-mm-dd':
      return `${year}-${addLeadingZeros(month + 1)}-${addLeadingZeros(date)}`

    default:
      return `${date} ${months[month]} ${year}`
  }

}


// all credits: https://www.kirupa.com/html5/get_element_position_using_javascript.htm
export const getPosition = function(el) {
  let xPos = 0
  let yPos = 0

  while (el) {
    if (el.tagName === 'BODY') {
      // deal with browser quirks with body/window/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft
      let yScroll = el.scrollTop || document.documentElement.scrollTop

      xPos += (el.offsetLeft - xScroll + el.clientLeft)
      yPos += (el.offsetTop - yScroll + el.clientTop)
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
      yPos += (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
  }
  return {
    x: xPos,
    y: yPos
  }
}


export const toMaps = function(data){
  let maps = []
  data.forEach(obj => {
    let map = new Map()
    Object.entries(obj).forEach(([key, value]) => {
      map[key] = value
    })
    maps.push(map)
    console.log(map.values)
  })
  return maps
}

export const toMaps2 = function(data){
  data.forEach(obj => {
    let values = []
    Object.values(obj).forEach(value => {
      values.push(values)
    })
    obj.values = values
  })
  return data
}

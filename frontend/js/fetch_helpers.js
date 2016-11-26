// fetch helpers

export function status(response) {
  if(response.status >= 200 && response.status < 300){
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))

}

export function json(response){
  return response.json()
}

export function arrayBuffer(response){
  return response.arrayBuffer()
}


export function fetchJSON(url){
  return new Promise((resolve, reject) => {
    // fetch(url, {
    //   mode: 'no-cors'
    // })
    fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      resolve(data)
    })
    .catch(e => {
      reject(e)
    })
  })
}

export function fetchJSONFiles(url_array){

  return new Promise((resolve, reject) => {

    let promises = []
    let errors = []

    url_array.forEach(url => {
      promises.push(
        fetch(url)
        .then(status)
        .then(json)
        .then(data => {
          return data
        })
        .catch(e => {
          errors.push(url)
          return null
        })
      )
    })

    Promise.all(promises)
    .then(
      data => {
        let jsonFiles
        jsonFiles = data.filter(file => {
          return file !== null
        })
        resolve({jsonFiles, errors})
      },
      error => {
        reject({error})
      }
    )
  })
}

export function fetchJSONFiles2(object, baseurl){

  return new Promise((resolve, reject) => {

    let promises = []
    let errors = []
    let keys = []

    Object.entries(object).forEach(([key, url]) => {
      keys.push(key)
      promises.push(
        fetch(baseurl + url)
        .then(status)
        .then(json)
        .then(data => {
          return data
        })
        .catch(e => {
          errors.push(url)
          return null
        })
      )
    })

    Promise.all(promises)
    .then(
      data => {
        let jsonFiles = {}
        data.forEach((file, index) => {
          if(file !== null){
            jsonFiles[keys[index]] = file
          }
        })
        resolve({jsonFiles, errors})
      },
      error => {
        reject({error})
      }
    )
  })
}

export function fetchArraybuffer(url){
  return new Promise((resolve, reject) => {
    // fetch(url, {
    //   mode: 'no-cors'
    // })
    fetch(url)
    .then(status)
    .then(arrayBuffer)
    .then(data => {
      resolve(data)
    })
    .catch(e => {
      reject(e)
    })
  })
}

import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  // baseURL: 'http://localhost:3000/api/v1',
  // baseURL: 'http://staging.aviator.aero/api/v1',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})

export async function loadMusicFolder(){  
  return apiClient
    .get("/player/load_music_folder")
    .then(response => {
      return response.data
    })
}

export async function playlist(){  
  return apiClient
    .get("/player/playlist")
    .then(response => {
      return response.data
    })
}

export async function clearPlaylist(){  
  return apiClient
    .get("/player/clear")
    .then(response => {
      return response.data
    })
}

export async function nextSong(){  
  return apiClient
    .get("/player/next")
    .then(response => {
      return response.data
    })
}

export async function prevSong(){  
  return apiClient
    .get("/player/prev")
    .then(response => {
      return response.data
    })
}

export async function volUp(){  
  return apiClient
    .get("/player/volup")
    .then(response => {
      return response.data
    })
}

export async function volDown(){  
  return apiClient
    .get("/player/voldown")
    .then(response => {
      return response.data
    })
}

export async function status(){  
  return apiClient
    .get("/player/status")
    .then(response => {
      return response.data
    })
}

export async function goto(index){  
  return apiClient
    .get("/player/goto?key="+index)
    .then(response => {
      return response.data
    })
}

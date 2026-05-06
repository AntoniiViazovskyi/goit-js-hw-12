import axios from 'axios'

const API_KEY = '55650977-325eb2c5dbf82028ab6c3840d'
const BASE_URL = 'https://pixabay.com/api/'

export default function getImagesByQuery(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw new Error(`Failed to fetch images: ${error.message}`)
    })
}

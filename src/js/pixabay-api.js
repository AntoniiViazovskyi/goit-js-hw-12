import axios from 'axios'

const API_KEY = '55650977-325eb2c5dbf82028ab6c3840d'
const BASE_URL = 'https://pixabay.com/api/'
const perPageLimit = 15

async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPageLimit
    }
  })
  return response.data
}

export { getImagesByQuery, perPageLimit }

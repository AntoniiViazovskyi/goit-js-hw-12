import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import getImagesByQuery from './js/pixabay-api.js'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js'
import errorIcon from './img/bi_x-octagon.svg'

const ERROR_MESSAGE_EMPTY_FIELD =
  'The input field cannot be empty. Please paste the value!'
const ERROR_MESSAGE_NO_IMAGE =
  'Sorry, there are no images matching your search query. Please try again!'
const ERROR_SMTH_WENT_WRONG = 'Something went wrong. Please try again later.'

const form = document.querySelector('.form')
const input = document.querySelector('[name="search-text"]')

form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  event.preventDefault()

  const keyword = input.value.trim()
  if (keyword === '') {
    iziToast.show({
      position: 'topRight',
      message: ERROR_MESSAGE_EMPTY_FIELD,
      messageColor: 'white',
      color: '#EF4040',
      iconUrl: errorIcon,
      iconColor: '#FFFFFF'
    })
    form.reset()
    return
  }

  clearGallery()
  showLoader()
  getImagesByQuery(keyword)
    .then((response) => {
      if (response.hits.length === 0) {
        iziToast.show({
          position: 'topRight',
          message: ERROR_MESSAGE_NO_IMAGE,
          messageColor: 'white',
          color: '#EF4040',
          iconUrl: errorIcon,
          iconColor: '#FFFFFF'
        })
        return
      }

      createGallery(response.hits)
    })
    .catch(() => {
      iziToast.show({
        position: 'topRight',
        message: ERROR_SMTH_WENT_WRONG,
        messageColor: 'white',
        color: '#EF4040',
        iconUrl: errorIcon
      })
    })
    .finally(() => {
      hideLoader()
      form.reset()
    })
}

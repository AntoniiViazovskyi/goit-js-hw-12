import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { getImagesByQuery, perPageLimit } from './js/pixabay-api.js'
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreBtn
} from './js/render-functions.js'
import errorIcon from './img/bi_x-octagon.svg'

const ERROR_MESSAGE_EMPTY_FIELD =
  'The input field cannot be empty. Please paste the value!'
const ERROR_MESSAGE_NO_IMAGE =
  'Sorry, there are no images matching your search query. Please try again!'
const ERROR_SMTH_WENT_WRONG = 'Something went wrong. Please try again later.'
const MSG_LIMIT_RECORD = `We're sorry, but you've reached the end of search results.`

const form = document.querySelector('.form')
const input = document.querySelector('[name="search-text"]')
let page = 1
let keyword

form.addEventListener('submit', handleSubmit)
loadMoreBtn.addEventListener('click', async () => {
  page += 1
  const isSuccess = await fetchData()
  if (isSuccess) {
    scroll()
  } else {
    page -= 1
  }
})

async function handleSubmit(event) {
  event.preventDefault()
  page = 1
  keyword = input.value.trim()
  if (keyword === '') {
    iziToast.show({
      position: 'topRight',
      message: ERROR_MESSAGE_EMPTY_FIELD,
      messageColor: 'white',
      color: '#4E75FF'
    })
    form.reset()
    return
  }

  clearGallery()
  hideLoadMoreButton()
  await fetchData()
  form.reset()
}

function checkLastPage(currentPage, totalHits) {
  if (totalHits > currentPage * perPageLimit) {
    showLoadMoreButton()
    return
  } else {
    hideLoadMoreButton()
    iziToast.show({
      position: 'topRight',
      message: MSG_LIMIT_RECORD,
      messageColor: 'white',
      color: '#4E75FF'
    })
  }
}

async function fetchData() {
  try {
    showLoader()
    const response = await getImagesByQuery(keyword, page)
    const { hits, totalHits } = response

    if (hits.length === 0) {
      iziToast.show({
        position: 'topRight',
        message: ERROR_MESSAGE_NO_IMAGE,
        messageColor: 'white',
        color: '#EF4040',
        iconUrl: errorIcon,
        iconColor: '#FFFFFF'
      })

      return false
    }

    createGallery(hits)
    checkLastPage(page, totalHits)

    return true
  } catch {
    iziToast.show({
      position: 'topRight',
      message: ERROR_SMTH_WENT_WRONG,
      messageColor: 'white',
      color: '#EF4040',
      iconUrl: errorIcon
    })

    return false
  } finally {
    hideLoader()
  }
}

function scroll() {
  const galleryWrapper = document.querySelector('.gallery-wrapper')
  if (!galleryWrapper) {
    return
  }
  const height = galleryWrapper.getBoundingClientRect().height
  window.scrollBy({
    top: 2 * height,
    behavior: 'smooth'
  })
}

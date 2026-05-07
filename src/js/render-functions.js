import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

const gallery = document.querySelector('.gallery')
const loaderWrapper = document.querySelector('.loader-wrapper')
const loadMoreBtn = document.querySelector('.load-more')

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'img',
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250
})

function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads
      }) => `<li class="gallery-item">
            <div class="gallery-wrapper">
                <a class="gallery-link" href="${largeImageURL}">
                    <img
                         class="gallery-image"
                        src="${webformatURL}"
                        alt="${tags}"
                     />
                </a>
                <div class="statistics-wrapper">
                <ul class="statistics-list">
                <li class="statistics-item"><h2 class="statistics-title">Likes</h2><p class="statistics-text">${likes}</p></li>
                <li class="statistics-item"><h2 class="statistics-title">Views</h2><p class="statistics-text">${views}</p></li>
                <li class="statistics-item"><h2 class="statistics-title">Comments</h2><p class="statistics-text">${comments}</p></li>
                <li class="statistics-item"><h2 class="statistics-title">Downloads</h2><p class="statistics-text">${downloads}</p></li>
                </ul>
                </div>
            </div>
        </li>`
    )
    .join('')

  gallery.insertAdjacentHTML('beforeend', markup)

  lightbox.refresh()
}
function clearGallery() {
  gallery.innerHTML = ''
}
function showLoader() {
  loaderWrapper.classList.add('visible')
}

function hideLoader() {
  loaderWrapper.classList.remove('visible')
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('visually-hidden')
}
function hideLoadMoreButton() {
  loadMoreBtn.classList.add('visually-hidden')
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMoreBtn
}

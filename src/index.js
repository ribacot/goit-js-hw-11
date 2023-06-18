// import { pageGallery } from './pageGallery';
import axios from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.9,
  closeText: '&#10007;',
});

// lightbox.on('error.simplelightbox', function (e) {
//   console.log(e); // some usefull information
// });

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreEl = document.querySelector('.js-load-more');

formEl.addEventListener('submit', onSearch);
loadMoreEl.classList.add('visually-hidden');
loadMoreEl.addEventListener('click', onLoad);

const PER_PAGE = 10;
let counterPage = null;
let searchWord = '';

function onSearch(e) {
  e.preventDefault();
  counterPage = 1;
  galleryEl.innerHTML = '';
  const {
    searchQuery: { value },
  } = e.target.elements;
  searchWord = value;
  if (!value) {
    return Notify.failure('Введіть слово');
  }

  pageGallery(searchWord, counterPage, PER_PAGE);
  e.target.elements.searchQuery.value = '';
  loadMoreEl.classList.remove('visually-hidden');
}

function onLoad() {
  counterPage += 1;
  console.log(counterPage);
  pageGallery(searchWord, counterPage, PER_PAGE);
  // lightbox.refresh();
}
// export { counterPage, galleryEl, loadMoreEl };

function pageGallery(value, page, per_page) {
  const searhObj = createRecvest(value.trim(), page, per_page);
  searhObj
    .then(obj => {
      // console.log('obj.totalHits ', obj.totalHits / per_page);
      // console.log('counterPage ', counterPage);
      // console.log('per_page ', per_page);
      if (counterPage - obj.totalHits / per_page >= 0) {
        loadMoreEl.classList.add('visually-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      return galleryEl.insertAdjacentHTML('beforeend', createGalerry(obj));
    })
    .catch(err => console.log(err));
}

function createRecvest(value, page, PER_PAGE) {
  Loading.circle();

  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '37410571-78e708f3fcce6ce73b7e36a87';
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&orientation=horizontal&image_type=photo&safesearch=true&q=${value}&page=${page}&per_page=${PER_PAGE}`
    )
    .then(resp => {
      console.log(resp.data);
      if (!resp.data.total) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      return resp.data;
    })
    .catch(err => Notify.failure(`${err.message}`))
    .finally(Loading.remove(300));
}

function createGalerry(obj) {
  const { hits: phots } = obj;
  return phots
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        comments,
        downloads,
        views,
      }) => `<div class="photo-card picture "><div class="gallery__item gallery"><a href="${largeImageURL}"> <img  class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" />
 </a></div>
 
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}



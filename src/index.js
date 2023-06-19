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

const options = {
  q: '',
  page: "",
  per_page: 10,


}

function onSearch(e) {
  e.preventDefault();
  options.page = 1;
  galleryEl.innerHTML = '';
  const {
    searchQuery: { value },
  } = e.target.elements;
  options.q = value.trim();
  if (!value) {
    throw Notify.failure('Введіть слово');
  }

  pageGallery(options);
  e.target.elements.searchQuery.value = '';
  loadMoreEl.classList.remove('visually-hidden');
}

function onLoad() {
  options.page += 1;
  console.log(options.page);
  pageGallery(options);
  // lightbox.refresh();
}
// export { counterPage, galleryEl, loadMoreEl };

function pageGallery(options) {
  const { page,per_page } = options;
  const searhObj = createRecvest(options);
  searhObj
    .then(obj => {
      console.log('obj.totalHits ', obj.totalHits / per_page);
      console.log('counterPage ', page);
      console.log('per_page ', per_page);
      if (page - obj.totalHits / per_page >= 0) {
        loadMoreEl.classList.add('visually-hidden');
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
      return galleryEl.insertAdjacentHTML('beforeend', createGalerry(obj));
    })
    .catch(err => console.log(err));
}

function createRecvest(options) {
  Loading.circle();
  const searchParams = new URLSearchParams({
    ...options,
    orientation: "horizontal",
    mage_type: "photo",
    safesearch: true,
    key: '37410571-78e708f3fcce6ce73b7e36a87',

  })

  const BASE_URL = 'https://pixabay.com/api';
  return axios
    .get(
      `${BASE_URL}?${searchParams}`
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



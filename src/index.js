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

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.js-gallery');
const loadMoreEl = document.querySelector('.js-load-more');

formEl.addEventListener('submit', onSearch);
loadMoreEl.classList.add('visually-hidden');
loadMoreEl.addEventListener('click', onLoad);

const options = {
  q: '',
  page: null,
  per_page: 40,
};

async function onSearch(e) {
  try {
    e.preventDefault();
    options.page = 1;
    galleryEl.innerHTML = '';
    const {
      searchQuery: { value },
    } = e.target.elements;
    options.q = value.trim();
    if (!value) {
      return Notify.failure('Введіть слово');
    }
    await createPageGallery(options);
    e.target.elements.searchQuery.value = '';
  } catch {
    // console.log('перед errrr')
    err => Notify.failure(err.message);
    loadMoreEl.classList.add('visually-hidden');

    e.target.elements.searchQuery.value = '';
  } finally {
    Loading.remove();
    lightbox.refresh();
  }
}

async function onLoad() {
  options.page += 1;
  createPageGallery(options).catch(err => console.log(err.message));
}

async function createPageGallery(optionsObj) {
  loadMoreEl.classList.remove('visually-hidden');

  const { page, per_page } = optionsObj;
  const searhObj = await serviceImage(optionsObj);
  if (page === 1) {
    Notify.info(`Hooray! We found ${searhObj.totalHits} images`);
  }

  if (searhObj.hits.length === 0) {
    loadMoreEl.classList.add('visually-hidden');
    return Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  // page - searhObj.totalHits / per_page > 0
  if (page >= searhObj.totalHits / per_page) {
    loadMoreEl.classList.add('visually-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  galleryEl.insertAdjacentHTML('beforeend', createGalerryDom(searhObj));
  Loading.remove(300);
  lightbox.refresh();
}

async function serviceImage(optionsObj) {
  try {
    Loading.circle();
    const BASE_URL = 'https://pixabay.com/api/';
    const resp = await axios.get(BASE_URL, {
      params: {
        ...optionsObj,
        orientation: 'horizontal',
        mage_type: 'photo',
        safesearch: true,
        key: '37410571-78e708f3fcce6ce73b7e36a87',
      },
    });
    console.log(resp)
    console.log(resp.data.total);
    console.log(options.per_page);

    return resp.data;
  } catch {
    console.log(resp.statusText)
    // err=>Notify.failure(err)
  }
}

function createGalerryDom(obj) {
  const { hits } = obj;
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        comments,
        downloads,
        views,
      }) => `<a href="${largeImageURL}"> <div class="photo-card picture "><div class="gallery__item "><img  class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" />
</div>
 
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
</div> </a>`
    )
    .join('');
}

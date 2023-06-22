import { createPageGallery } from './createPageGallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.9,
  closeText: '&#10007;',
});

const formEl = document.querySelector('#search-form');
export const galleryEl = document.querySelector('.js-gallery');
export const loadMoreEl = document.querySelector('.js-load-more');

formEl.addEventListener('submit', onSearch);
loadMoreEl.classList.add('visually-hidden');
loadMoreEl.addEventListener('click', onLoad);

const options = {
  q: '',
  page: null,
  per_page: 40,
};

async function onSearch(e) {
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
  lightbox.refresh();
}

async function onLoad() {
  options.page += 1;
  await createPageGallery(options);
  lightbox.refresh();
}


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
export const guardEl = document.querySelector('.js-guard-gallery');
const headerElHeight = document.querySelector('.header-image').clientHeight;
const sectionEl = document.querySelector('.section-gallery');

sectionEl.style.paddingTop = `${headerElHeight+20}px`;
formEl.addEventListener('submit', onSearch);

let optionsObserver = {
  root: null,
  rootMargin: "400px",
  threshold: 1.0,
};

export let observer = new IntersectionObserver(onLoad, optionsObserver);

const options = {
  q: '',
  page: null,
  per_page: 40 ,
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
  } catch (err) {
    console.log(err);
  } finally {
    e.target.elements.searchQuery.value = '';
  }
}

function onLoad(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      options.page += 1;
      await createPageGallery(options);
    }
  });
}

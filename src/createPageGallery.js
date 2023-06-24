import { serviceImage } from './serviceImage';
import { createGalerryDom } from './createGalerryDom';
import { galleryEl, lightbox, observer, guardEl } from '.';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';

export async function createPageGallery(optionsObj) {
  try {

    const { page, per_page } = optionsObj;
    if (page === 1) {
      Loading.circle();
    }
    const searhObj = await serviceImage(optionsObj);
    if (searhObj.hits.length === 0) {
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    galleryEl.insertAdjacentHTML('beforeend', createGalerryDom(searhObj));
    if (page >= searhObj.totalHits / per_page) {
      observer.unobserve(guardEl);
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }

    if (page === 1) {
      observer.observe(guardEl);
      Notify.info(`Hooray! We found ${searhObj.totalHits} images`);
    }
  } catch (err) {
    galleryEl.innerHTML = '';
    console.log(err.message);
  } finally {
    Loading.remove(300);
        lightbox.refresh();

  }
}

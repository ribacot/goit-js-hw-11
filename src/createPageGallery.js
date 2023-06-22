import { serviceImage } from "./serviceImage";
import { createGalerryDom } from "./createGalerryDom";
import { loadMoreEl, galleryEl } from ".";
import { Notify } from "notiflix";
import { Loading } from "notiflix";
import { lightbox } from ".";


export async function createPageGallery(optionsObj) {
  try {
    loadMoreEl.classList.remove('visually-hidden');

    const { page, per_page } = optionsObj;
    const searhObj = await serviceImage(optionsObj);

    if (searhObj.hits.length === 0) {
      loadMoreEl.classList.add('visually-hidden');
      return Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (page === 1) {
      Notify.info(`Hooray! We found ${searhObj.totalHits} images`);
    }

    if (page >= searhObj.totalHits / per_page) {
      loadMoreEl.classList.add('visually-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    galleryEl.insertAdjacentHTML('beforeend', createGalerryDom(searhObj));
    lightbox.refresh();
  } catch (err) {
    console.log(err.message);
    Notify.failure(err.message);
    loadMoreEl.classList.add('visually-hidden');
  } finally {
    Loading.remove(300);
  }
}

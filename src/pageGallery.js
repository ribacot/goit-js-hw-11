// import { createRecvest } from './createRecvest';
// import { createGalerry } from './createGalerry';
// import { counterPage, galleryEl, loadMoreEl } from '.';
// import { Notify } from 'notiflix';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   overlayOpacity: 0.9,
//   closeText: '&#10007;',
// });


// export function pageGallery(value, page, per_page) {
//   const searhObj = createRecvest(value.trim(), page, per_page);
//   searhObj
//     .then(obj => {
//       console.log('obj.totalHits ', obj.totalHits / per_page);
//       console.log('counterPage ', counterPage);
//       console.log('per_page ', per_page);
//       if (counterPage - obj.totalHits / per_page >= 0) {
//         loadMoreEl.classList.add('visually-hidden');
//         Notify.failure(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//       return galleryEl.insertAdjacentHTML('beforeend', createGalerry(obj));
//     })
//     .catch(err => console.log(err));
// }

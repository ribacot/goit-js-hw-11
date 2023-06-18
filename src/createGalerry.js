// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// const lightbox = new SimpleLightbox('.picture a', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   overlayOpacity: 0.9,
//   closeText: '&#10007;',
// });

// export function createGalerry(obj) {
//   const { hits: phots } = obj;
//   return phots
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         comments,
//         downloads,
//         views,
//         }) =>`<div class="photo-card picture ">
//  <a href="${largeImageURL}"> <div class="gallery__item gallery"><img  class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" /></div>
//  </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${downloads}</b>
//     </p>
//   </div>
// </div>`).join('');
// }

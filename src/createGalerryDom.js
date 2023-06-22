

export function createGalerryDom(obj) {
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

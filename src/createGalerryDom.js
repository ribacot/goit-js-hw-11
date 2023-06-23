

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
      }) => `
      <div class="photo-card picture ">
      <a href="${largeImageURL}"> 
      <div class="gallery__item ">
      <img  class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width="300px" />
</div></a>
 
  <div class="thumb">
  <div class="info">
  <p class="info-item">
  <b>Likes: ${likes}</b>
</p>
<p class="info-item">
  <b>Views: ${views}</b>
</p></div>
<div class="info">

    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>  </div>

  </div>
</div> `
    )
    .join('');
}
{/* <div class="photo-card">
  c  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */}
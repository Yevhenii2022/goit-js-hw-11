import Notiflix from 'notiflix';
import { getImages } from './fetch-images';

getImages('sex');

const galleryEl = document.querySelector('.gallery');

function renderGalleryList(gallerys) {
  const markup = gallerys
    .map(
      gallery => `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
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
</div>`
    )
    .join('');
  console.log(webformatURL);
  galleryEl.innerHTML = markup;
}

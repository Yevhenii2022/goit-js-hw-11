import Notiflix from 'notiflix';
import { ImagesAPI } from './fetch-images';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const imagesAPI = new ImagesAPI();

isLoadMoreBtnShow(false);

formEl.addEventListener('submit', handleFormElSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnElClick);

async function handleFormElSubmit(event) {
  event.preventDefault();

  isLoadMoreBtnShow(false);

  galleryEl.innerHTML = '';

  imagesAPI.page = 1;

  imagesAPI.query = event.currentTarget.elements.searchQuery.value.trim();

  if (imagesAPI.query === '') {
    console.log('nothing');
    return;
  }

  try {
    const { hits: images, totalHits: totalQuantity } =
      await imagesAPI.getImages();
    console.log(images);

    if (!totalQuantity) {
      console.log('not found');
      return;
    }

    renderGalleryList(images);

    if (totalQuantity < imagesAPI.page * imagesAPI.per_page) {
      isLoadMoreBtnShow(false);
      console.log('endddd');
      return;
    }

    isLoadMoreBtnShow(true);
  } catch (error) {
    console.log(error);
  }
}

async function handleLoadMoreBtnElClick(event) {
  imagesAPI.page += 1;

  try {
    const { hits: images, totalHits: totalQuantity } =
      await imagesAPI.getImages();
    console.log(images);

    renderGalleryList(images);

    autoScrollPage();

    if (totalQuantity < imagesAPI.page * imagesAPI.per_page) {
      isLoadMoreBtnShow(false);
      console.log('endddd');
    }
  } catch (error) {
    console.log(error);
  }
}

function renderGalleryList(gallerys) {
  const markup = gallerys
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a href="${largeImageURL}">
        <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
</a>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function isLoadMoreBtnShow(boolean) {
  loadMoreBtnEl.style.display = boolean ? 'block' : 'none';
}

function autoScrollPage() {
  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

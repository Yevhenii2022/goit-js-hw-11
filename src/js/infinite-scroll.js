import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ImagesAPI } from './fetch-images';

const formEl = document.getElementById('search-form');
const galleryEl = document.querySelector('.gallery');

const imagesAPI = new ImagesAPI();

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250',
});

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

const io = new IntersectionObserver(handleScroll, options);

formEl.addEventListener('submit', handleFormElSubmit);

async function handleFormElSubmit(event) {
  event.preventDefault();

  galleryEl.innerHTML = '';

  imagesAPI.page = 1;

  imagesAPI.query = event.currentTarget.elements.searchQuery.value.trim();

  if (imagesAPI.query === '') {
    notifySearchNameAbsence();
    return;
  }

  try {
    const { hits: images, totalHits: totalQuantity } =
      await imagesAPI.getImages();

    if (!totalQuantity) {
      notifyIncorrectQuery();
      return;
    }

    showAmountOfHits(totalQuantity);

    renderGalleryList(images);

    if (totalQuantity < imagesAPI.page * imagesAPI.per_page) {
      notifyEndOfGallery();
      return;
    }

    if (imagesAPI.page < totalQuantity / imagesAPI.per_page) {
      const target = document.querySelector('.photo-card:last-child');
      io.observe(target);
    }
  } catch (error) {
    console.log(error);
    notifyQueryError(error);
  }
}

async function handleScroll(entries, observer) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      imagesAPI.page += 1;
      observer.unobserve(entry.target);

      try {
        const { hits: images, totalHits: totalQuantity } =
          await imagesAPI.getImages();

        renderGalleryList(images);

        autoScrollPage();

        lightbox.refresh();

        if (imagesAPI.page < totalQuantity / imagesAPI.per_page) {
          const target = document.querySelector('.photo-card:last-child');
          io.observe(target);
        } else {
          notifyEndOfGallery();
        }
      } catch (error) {
        notifyQueryError(error);
        console.log(error);
      }
    }
  });
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
        `<div class="photo-card">
        <a class="photo-card__item" href="${largeImageURL}">
          <div class="photo-card__tumb">
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </div>
          <div class="info">
            <p class="info-item">
              <b class="info-item__param">Likes</b>
              <span class="info-item__num">${likes}</span>
            </p>
            <p class="info-item">
              <b class="info-item__param">Views</b>
              <span class="info-item__num">${views}</span>
            </p>
            <p class="info-item">
              <b class="info-item__param">Comments</b>
              <span class="info-item__num">${comments}</span>
            </p>
            <p class="info-item">
              <b class="info-item__param">Downloads</b>
              <span class="info-item__num">${downloads}</span>
            </p>
          </div>
        </a>
      </div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

function notifyIncorrectQuery() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      position: 'center-center',
    }
  );
}

function notifyEndOfGallery() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results.",
    {
      position: 'center-center',
    }
  );
}

function showAmountOfHits(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`, {
    position: 'center-center',
  });
}

function notifyQueryError(error) {
  Notiflix.Notify.failure(
    `Oops! Something went wrong. You caught the following error: ${error.message}.`,
    {
      position: 'center-center',
    }
  );
}

function notifySearchNameAbsence() {
  Notiflix.Notify.info(
    'To search for pictures you need to specify what you are looking for.',
    {
      position: 'center-center',
    }
  );
}

function autoScrollPage() {
  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

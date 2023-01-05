import Notiflix from 'notiflix';
import fetchImages from './fetchImages';
import './css/styles.css';

let page = 1;
let per_page = 40;

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const button = document.querySelector('.load-more');
let query = null;

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${downloads}</span>
          </p>
        </div>
      </div>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

const handleSubmit = async e => {
  e.preventDefault();
  page = 1;
  button.style.display = 'none';
  galleryEl.innerHTML = '';
  const elements = form.elements;
  query = elements.searchQuery.value;
  const images = await fetchImages(query, page, per_page);
 

  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return false;
  }

  renderImages(images.hits);
  button.style.display = 'block';
  page = page + 1;
};

const handleClick = async e => {
  button.style.display = 'none';
  const images = await fetchImages(query, page, per_page);
  renderImages(images.hits);
  button.style.display = 'block';

  page = page + 1;

  if ((page - 1) * per_page >= images.totalHits) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    button.style.display = 'none';
  }
};

form.addEventListener('submit', e => handleSubmit(e));
button.addEventListener('click', handleClick);

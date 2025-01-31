import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import axios from 'axios';
import { imagesCardTemplate } from './js/render-functions';
import { fetchSearch } from './js/pixabay-api';

const searchForm = document.querySelector('.search-form');
const formInput = document.querySelector('.search-input');
const formBtn = document.querySelector('.search-button');
const imagesListEl = document.querySelector('.gallery');

const loader = document.querySelector('.loader'); // Додати до HTML елемент з класом loader
const loadMoreBtn = document.querySelector('.load-more-btn');

// Ініціалізація SimpleLightbox
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
let page = 1;
let query = '';

loadMoreBtn.classList.add('is-hidden'); // Приховати кнопку пагінації

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();
    query = formInput.value.trim();

    if (!query) {
      iziToast.warning({
        message: 'Please enter a search term.',
        position: 'topRight',
      });
      return;
    }
    page = 1;

    loadMoreBtn.classList.add('is-hidden'); // Приховати кнопку пагінації
    // Очищення галереї перед новим запитом
    imagesListEl.innerHTML = '';

    loader.classList.add('active'); // Показати індикатор завантаження

    const response = await fetchSearch(query, page);

    loader.classList.remove('active'); // Приховати індикатор завантаження

    if (response.data.total === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    imagesListEl.insertAdjacentHTML(
      'beforeend',
      imagesCardTemplate(response.data.hits)
    );

    loadMoreBtn.classList.remove('is-hidden'); // Показати кнопку пагінації

    lightbox.refresh(); // Оновити SimpleLightbox
    if (page * 15 >= response.data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    loader.classList.remove('active'); // Приховати індикатор завантаження
    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topRight',
    });
    console.error('Error fetching data:', error);
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    page++;
    loader.classList.add('active'); // Показати індикатор завантаження
    const response = await fetchSearch(query, page);
    loader.classList.remove('active'); // Приховати індикатор завантаження
    imagesListEl.insertAdjacentHTML(
      'beforeend',
      imagesCardTemplate(response.data.hits)
    );

    lightbox.refresh(); // Оновити SimpleLightbox
    if (page * 15 >= response.data.totalHits) {
      loadMoreBtn.classList.add('is-hidden');
      loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.classList.remove('is-hidden');
      loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
    }
    const cardHeight = document
      .querySelector('.gallery-card')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (err) {
    console.log(err);
  }
};

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

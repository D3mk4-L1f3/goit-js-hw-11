import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import { searchField } from './module/pixabay-api';
import { onFormSubmitHandler, onFormInputHandler } from './module/form-input';
import { onScrollEvent, onEndElementScroll } from './module/scroll-event';
import { showConfirmation } from './module/notifix-action';
import { onMediaQueryChangeHandler } from './module/mobile-tablet';

const inputForm = document.querySelector('#search-form');
const mediaQuery = window.matchMedia('(max-width: 767px)');

export const searchButton = document.querySelector('.js-searcher');
export const axiosObserver = new IntersectionObserver(onScrollEvent, { root: null, rootMargin: '600px' });
export const scrollBreakPoint = document.querySelector('.js-unattainable');
export const galleryContainer = document.querySelector('.js-gallery');
export const visualDecor = new SimpleLightbox('.js-gallery a');
export const endObserver = new IntersectionObserver(onEndElementScroll, { root: null, rootMargin: '700px' });

inputForm.addEventListener('submit', onFormSubmitHandler);
inputForm.addEventListener('input', debounce(onFormInputHandler, 500));

mediaQuery.addEventListener('change', onMediaQueryChangeHandler);
onMediaQueryChangeHandler(mediaQuery);

searchButton.setAttribute('disabled', 'disabled');

if (!sessionStorage.getItem('hasVisitedForm')) {
  showConfirmation().then((isConfirmed) => {
    searchField.restrictions = isConfirmed ? 'false' : 'true';
    sessionStorage.setItem('hasVisitedForm', true);
  });
}


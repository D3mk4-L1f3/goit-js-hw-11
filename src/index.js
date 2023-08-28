import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import { searchField } from './module/pixabay-api';
import { onFormSubmitHandler, onFormInputHandler } from './module/form-input';
import { onScrollEvent, onEndElementScroll } from './module/scroll-event';

const inputForm = document.querySelector('#search-form');

export const searchButton = document.querySelector('.js-searcher');
export const axiosObserver = new IntersectionObserver(onScrollEvent, { root: null, rootMargin: '600px' });
export const scrollBreakPoint = document.querySelector('.js-unattainable');
export const galleryContainer = document.querySelector('.js-gallery');
export const visualDecor = new SimpleLightbox('.js-gallery a');
export const endObserver = new IntersectionObserver(onEndElementScroll, { root: null, rootMargin: '700px' });
export const mediaQuery = window.matchMedia('(max-width: 767px)');
export const inputField = document.querySelector('.input-place');


inputForm.addEventListener('submit', onFormSubmitHandler);
inputForm.addEventListener('input', debounce(onFormInputHandler, 500));

mediaQuery.addEventListener('change', onMediaQueryChangeHandler);
onMediaQueryChangeHandler(mediaQuery);

searchButton.setAttribute('disabled', 'disabled');

if (!sessionStorage.getItem('hasVisitedForm')) {
  Notiflix.Confirm.show(
    'Hi, you are at picture-searcher',
    'Are you going to quick watch?',
    'Yes',
    'No',
    function (isConfirmed) {
      searchField.restrictions = isConfirmed ? 'false' : 'true';
      sessionStorage.setItem('hasVisitedForm', true);
    }
  );
}

function onMediaQueryChangeHandler(mediaQuery) {
  searchField.updateOrientation(mediaQuery.matches ? 'vertical' : 'horizontal');
}


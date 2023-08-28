import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { searchField } from './pixabay-api';
import { getImage } from './scroll-event';

export const searchButton = document.querySelector('.js-searcher');
export const axiosObserver = new IntersectionObserver(onScrollEvent, { root: null, rootMargin: '600px' });
export const scrollBreakPoint = document.querySelector('.js-unattainable');
export const galleryContainer = document.querySelector('.js-gallery');
export const inputField = document.querySelector('.input-place');

const inputForm = document.querySelector('#search-form');
inputForm.addEventListener('submit', onFormSubmitHandler);
inputForm.addEventListener('input', debounce(onFormInputHandler, 500));

searchButton.setAttribute('disabled', 'disabled');

export function onFormInputHandler() {
  const inputValue = inputField.value.trim();
  if (inputValue === '' || inputValue.startsWith(' ')) {
      searchButton.setAttribute('disabled', 'disabled');
      searchButton.style.color = 'red';
  } else {
      searchButton.removeAttribute('disabled');
      searchButton.style.color = 'green';
  }
}

export async function onFormSubmitHandler(evt) {
    evt.preventDefault();
    axiosObserver.unobserve(scrollBreakPoint);
    searchField.resetPage();
    galleryContainer.innerHTML = '';

    searchField.query = evt.target.elements.searchQuery.value.trim();

    try {
        await getImage();
        const totalHits = localStorage.getItem('totalHits');
        if (Number(totalHits)) {
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    } catch (error) {
        Notiflix.Notify.failure(`Oops! Something goes wrong, please reload this page or try later!`);
    }
}





 
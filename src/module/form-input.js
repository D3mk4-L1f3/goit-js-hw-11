import Notiflix from 'notiflix';
import { searchField } from './pixabay-api';
import { onScrollEvent, getImage } from './scroll-event';

export const searchButton = document.querySelector('.js-searcher');
export const axiosObserver = new IntersectionObserver(onScrollEvent, { root: null, rootMargin: '600px' });
export const scrollBreakPoint = document.querySelector('.js-unattainable');
export const galleryContainer = document.querySelector('.js-gallery');
export const inputField = document.querySelector('.input-place');

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





 
import Notiflix from 'notiflix';
import { searchButton, axiosObserver, scrollBreakPoint, galleryContainer } from '../index';
import { searchField } from './pixabay-api';
import { onCreateMarkup } from './gallery-markup';
import { getImage } from './scroll-event';

export const inputField = document.querySelector('.input-place');

export function onFormInputHendler() {
  const inputValue = inputField.value.trim();
  if (inputValue === '' || inputValue.startsWith(' ')) {
      searchButton.setAttribute('disabled', 'disabled');
      searchButton.style.color = 'red';
  } else {
      searchButton.removeAttribute('disabled');
      searchButton.style.color = 'green';
  }
}

export async function onFormSubmitHendler(evt) {
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





 
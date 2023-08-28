import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import { searchField } from './module/pixabay-api';
import { onFormSubmitHandler, onFormInputHandler } from './module/form-input';
import { searchButton } from './module/form-input';

const inputForm = document.querySelector('#search-form');
const mediaQuery = window.matchMedia('(max-width: 767px)');

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


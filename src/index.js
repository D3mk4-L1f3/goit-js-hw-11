import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import PixabayAxiosSearch from './module/pixabay-api';
import htmlCode from './module/html-markup';
import { onCreateMarkup } from './module/gallery-markup';

const body = document.querySelector('body');
body.insertAdjacentHTML('beforeend', htmlCode);

const inputForm = document.querySelector('#search-form');
const inputField = document.querySelector('.input-place');
const searchButton = document.querySelector('.js-searcher');
const galleryContainer = document.querySelector('.js-gallery');
const scrollBreakPoint = document.querySelector('.js-unattainable');

inputForm.addEventListener('submit', onFormSubmitHendler);
inputForm.addEventListener('input', debounce(onFormInputHendler, 600));

const onServerFailAlert = `Oops! Something goes wrong, please reload this page or try later!`;
const onNoImgQuery = `Sorry, there are no images matching your search query. Please try again.`;
const endOfScroll = `We're sorry, but you've reached the end of search results.`;

searchButton.setAttribute('disabled', 'disabled');

const searchField = new PixabayAxiosSearch();

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

const visualDecor = new SimpleLightbox('.js-gallery a');

const infinityScrollOptions = {
    rootMargin: '350px',
    root: null,
};

const axiosObserver = new IntersectionObserver(onScrollEvent, infinityScrollOptions);

const endObserveOption = {
    rootMargin: '100px',
    root: null,
};

const endObserver = new IntersectionObserver(onEndElementScroll, endObserveOption);

function onFormInputHendler() {
  const inputValue = inputField.value.trim();
  if (inputValue === '' || inputValue.startsWith(' ')) {
    searchButton.setAttribute('disabled', 'disabled');
  } else {
    searchButton.removeAttribute('disabled');
  }
}

function onFormInputHendler() {
  const inputValue = inputField.value.trim();
  if (inputValue === '' || inputValue.startsWith(' ')) {
      searchButton.setAttribute('disabled', 'disabled');
      searchButton.style.color = 'red';
  } else {
      searchButton.removeAttribute('disabled');
      searchButton.style.color = 'green';
  }
}

async function onFormSubmitHendler(evt) {
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
        Notiflix.Notify.failure(`${onServerFailAlert}`);
    }
}

async function onScrollEvent(entries) {
    let totalPages = Number(localStorage.getItem('totalPages'));
    if (totalPages < searchField.page) {
        axiosObserver.unobserve(scrollBreakPoint);
        if (galleryContainer.lastElementChild) {
            endObserver.observe(galleryContainer.lastElementChild);
        }
        return;
    }

    const isIntersecting = entries[0].isIntersecting;
    if (isIntersecting) {
        try {
            searchField.page += 1;
            await getImage();
        } catch (error) {
            Notiflix.Notify.failure(`${onServerFailAlert}`);
        }
    }
}

async function getImage() {
    try {
        const response = await searchField.getImage();
        const { hits, totalHits } = response.data;
        const totalPages = Math.ceil(totalHits / searchField.pageSize);

        if (!hits.length) {
            Notiflix.Notify.failure(onNoImgQuery);
        } else {
            localStorage.setItem('totalHits', totalHits);
            localStorage.setItem('totalPages', totalPages);

            galleryContainer.insertAdjacentHTML('beforeend', onCreateMarkup(hits));

            axiosObserver.observe(scrollBreakPoint);
            visualDecor.refresh();
        }
    } catch (error) {
        Notiflix.Notify.failure(onServerFailAlert);
    }
}

async function onEndElementScroll(evt) {
    const isIntersecting = evt[0].isIntersecting;
    if (isIntersecting) {
        endObserver.unobserve(galleryContainer.lastChild);
        Notiflix.Notify.warning(`${endOfScroll}`);
    }
}




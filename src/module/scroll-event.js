import Notiflix from 'notiflix'; 

import { axiosObserver, visualDecor, scrollBreakPoint, galleryContainer, endObserver } from '../index';
import { searchField } from './pixabay-api';
import { onCreateMarkup } from './gallery-markup';


export async function onScrollEvent(entries) {
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
            Notiflix.Notify.failure(`Oops! Something goes wrong, please reload this page or try later!`);
        }
    }
}

export async function getImage() {
    try {
        const response = await searchField.getImage();
        
        const { hits, totalHits } = response.data;
        const totalPages = Math.ceil(totalHits / searchField.pageSize);

        if (!hits.length) {
            Notiflix.Notify.info(`Sorry, there are no images matching your search query. Please try again.`);
        } else {
            localStorage.setItem('totalHits', totalHits);
            localStorage.setItem('totalPages', totalPages);

            galleryContainer.insertAdjacentHTML('beforeend', onCreateMarkup(hits));

            axiosObserver.observe(scrollBreakPoint);
            visualDecor.refresh();
        }
        if (searchField.page > totalPages) {
            endObserver.observe(galleryContainer.lastElementChild);
        }

    } catch (error) {
        throw error; 
    }
}
export async function onEndElementScroll(entries) {
    const { isIntersecting, boundingClientRect } = entries[0];
    if (isIntersecting && boundingClientRect.top <= window.innerHeight) {
        endObserver.unobserve(galleryContainer.lastChild);
        Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
    }
}

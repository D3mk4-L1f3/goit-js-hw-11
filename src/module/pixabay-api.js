import axios from "axios";
import Notiflix from "notiflix";

const PIXABAY_API_KEY = '38987421-e938289573b3f0089dcf530c5';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export default class PixabayAxiosSearch {
    constructor(restrictions = 'false') {
        this.query = '';
        this.image = 'photo';
        this.orientation = 'horizontal';
        this.restrictions = restrictions;
        this.page = 1;
        this.pageSize = 40;
    }
    
    updateOrientation(newOrientation) {
        this.orientation = newOrientation;
    }

    updateRestrictions(newRestrictions) {
        this.restrictions = newRestrictions;
    }

    async getImage() {
        const params = new URLSearchParams({
            key: PIXABAY_API_KEY,
            q: this.query,
            image_type: this.image,
            orientation: this.orientation,
            safesearch: this.restrictions,
            page: this.page,
            per_page: this.pageSize
        });
        const url = `${PIXABAY_BASE_URL}?${params}`;
        return await axios.get(url);
    }

    resetPage() {
        this.page = 1;
    }
}
export const searchField = new PixabayAxiosSearch();

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
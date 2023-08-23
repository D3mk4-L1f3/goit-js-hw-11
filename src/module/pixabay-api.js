import axios from "axios";

const PIXABAY_API_KEY = 'key=38987421-e938289573b3f0089dcf530c5';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export default class PixabayAxiosSearch {
    constructor() {
        this.inputText = '';
        this.image = 'photo';
        this.orientation = 'horizontal';
        this.restrictions = 'true';
        this.page = 1;
        this.pageSize = 40;
    }
    async getImage() {
        const createRequest = await axios.get(
            `${PIXABAY_BASE_URL}?${PIXABAY_API_KEY}` +
            `&q=${this.inputText}` +
            `&image_type=${this.image}` +
            `&orientation=${this.orientation}` +
            `&safesearch=${this.restrictions}` +
            `&page=${this.page}` +
            `&per_page=${this.pageSize}`
        );
        return createRequest;
    }
    get query() {
        return this.inputText;
    }
    set query(newQuery) {
        this.inputText = newQuery;
    }
    resetPage() {
        this.page = 1;
    }
}

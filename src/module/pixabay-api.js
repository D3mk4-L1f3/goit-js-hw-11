import axios from "axios";

const PIXABAY_API_KEY = '38987421-e938289573b3f0089dcf530c5';
const PIXABAY_BASE_URL = 'https://pixabay.com/api/';

export default class PixabayAxiosSearch {
    constructor() {
        this.query = '';
        this.image = 'photo';
        this.orientation = 'horizontal';
        this.restrictions = 'true';
        this.page = 1;
        this.pageSize = 40;
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


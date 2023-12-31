const htmlCode = `
<div class="form-wrapper">
    <form class="search-input" id="search-form">
        <input class="input-place" type="text" name="searchQuery" autocomplete="off" placeholder="Search images...">
        <button class="search-btn js-searcher" type="submit">
            <svg class="svg-current" xmlns="http://www.w3.org/2000/svg" style="width: 20px; height: 20px" viewBox="0 0 32 32">
                <path d="m31.008 27.231-7.58-6.447c-.784-.705-1.622-1.029-2.299-.998a11.954 11.954 0 0 0 2.87-7.787c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-.031.677.293 1.515.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007.23s.997-2.903-.23-4.007zM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"></path>
            </svg>
        </button>
    </form>
</div>
<div class="wrapper">
    <div class="search-gallery js-gallery"></div>
    <div class="js-unattainable"></div>
</div>
`;
const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', htmlCode);
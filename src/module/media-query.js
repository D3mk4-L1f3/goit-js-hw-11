mediaQuery.addEventListener('change', onMediaQueryChangeHandler);

const mediaQuery = window.matchMedia('(max-width: 767px)');

function onMediaQueryChangeHandler(mediaQuery) {
  searchField.updateOrientation(mediaQuery.matches ? 'vertical' : 'horizontal');
}
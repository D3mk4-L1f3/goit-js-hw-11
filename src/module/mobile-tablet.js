export function onMediaQueryChangeHandler(mediaQuery) {
  searchField.updateOrientation(mediaQuery.matches ? 'vertical' : 'horizontal');
}
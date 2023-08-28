import Notiflix from 'notiflix';

export function showConfirmation() {
  return new Promise((resolve) => {
    Notiflix.Confirm.show(
      'Hi, you are at picture-searcher',
      'Are you going to quick watch?',
      'Yes',
      'No',
      function (isConfirmed) {
        resolve(isConfirmed);
      }
    );
  });
}

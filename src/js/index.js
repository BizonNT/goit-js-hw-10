import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '500px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { selectMarkup, cardMarkup } from './markup';

const inputSelect = document.querySelector('.js-breed-select');
const breedCard = document.querySelector('.js-breed-card');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
let hideSelect = '';

onLoad();

function onLoad() {
  fetchBreeds()
    .then(data => {
      inputSelect.innerHTML = selectMarkup(data);
      new SlimSelect({
        select: inputSelect,
        settings: {
          placeholderText: 'Choose a Breed',
        },
      });
      hideSelect = document.querySelector('.ss-main');
      displaySet('flex', 'none');
    })
    .catch(error => onError(error));
}

function displaySet(hide, visible) {
  hideSelect.style.display = hide;
  breedCard.style.display = hide;
  loaderEl.style.display = visible;
}

function onError() {
  loaderEl.style.display = 'none';
  Notiflix.Notify.failure(errorEl.textContent);
  errorEl.style.display = 'flex';
  errorEl.classList.remove('hidden-field');
}

inputSelect.addEventListener('change', onInput);

function onInput(event) {
  displaySet('none', 'block');
  const imageId =
    event.currentTarget.options[inputSelect.selectedIndex].dataset.id;
  fetchCatByBreed(imageId)
    .then(data => {
      breedCard.innerHTML = cardMarkup(data);
      displaySet('flex', 'none');
    })
    .catch(error => onError(error));
}

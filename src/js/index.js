import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '500px',
  position: 'left-bottom',
  distance: '25px',
  fontSize: '16px',
  timeout: 4000,
});

import { fetchBreeds, fetchCatByBreed, fetchCurrentBreedImg } from './cat-api';
import { selectMarkup, cardMarkup, cardMarkupImg } from './markup';

const inputSelect = document.querySelector('.js-breed-select');
const breedCard = document.querySelector('.js-breed-card');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

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
      loaded();
    })
    .catch(error => onError(error));
}

function loading() {
  const hideSelect = document.querySelector('.ss-main');
  hideSelect.style.display = 'none';
  breedCard.style.display = 'none';
  loaderEl.style.display = 'block';
}

function loaded() {
  const hideSelect = document.querySelector('.ss-main');
  hideSelect.style.display = 'flex';
  breedCard.style.display = 'flex';
  loaderEl.style.display = 'none';
}

function onError() {
  breedCard.style.display = 'none';
  loaderEl.style.display = 'none';
  Notiflix.Notify.failure(errorEl.textContent);
  errorEl.style.display = 'flex';
  errorEl.classList.remove('hidden-field');
}

inputSelect.addEventListener('change', onInput);

function onInput(event) {
  loading();
  const breedId = event.currentTarget.value;
  const imageId =
    event.currentTarget.options[inputSelect.selectedIndex].dataset.id;
  if (imageId === 'undefined') {
    fetchCatByBreed(breedId)
      .then(data => {
        breedCard.innerHTML = cardMarkup(data);
        loaded();
      })
      .catch(error => onError(error));
  } else {
    fetchCurrentBreedImg(imageId)
      .then(data => {
        breedCard.innerHTML = cardMarkupImg(data);
        loaded();
      })
      .catch(error => onError(error));
  }
}

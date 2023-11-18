const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS = `breeds/`;
const IMAGES = 'images/';

const headers = new Headers({
  'x-api-key':
    'live_pbqIo3k3RSPZLzp2pIsE5mewdkthtOukwMbnH62gS4EZUfo9N3AqD5a02EUB3oVO',
});

export function fetchBreeds() {
  return fetch(`${BASE_URL}${BREEDS}`, headers).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCurrentBreedImg(imageId) {
  return fetch(`${BASE_URL}${IMAGES}${imageId}`, headers).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}${BREEDS}${breedId}`, headers).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS = `breeds/`;
const IMAGES = 'images/';

const options = {
  headers: {
    'x-api-key':
      'live_pbqIo3k3RSPZLzp2pIsE5mewdkthtOukwMbnH62gS4EZUfo9N3AqD5a02EUB3oVO',
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}${BREEDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(Id) {
  const endPoint = Id.length === 4 ? BREEDS : IMAGES;
  return fetch(`${BASE_URL}${endPoint}${Id}`, options).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

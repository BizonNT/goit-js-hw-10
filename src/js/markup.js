export function selectMarkup(array) {
  const defaultOption = '<option data-placeholder="true"></option>';

  return (
    defaultOption +
    array
      .map(
        ({ reference_image_id, id, name }) =>
          `<option value="${id}" data-id="${reference_image_id}">${name}</option>`
      )
      .join('')
  );
}

export function cardMarkup(array) {
  const imgUrl = array.url;
  const breeds = array.breeds;
  return breeds
    .map(
      ({ description, name, temperament }) =>
        `<img class="cat-img" src="${imgUrl}" alt="${name}" width="300px"/>
      <div class="cart-block">
        <h2 class="cart-title">${name}</h2>
        <p class="breed-description">${description}</p>
        <p class="breed-temperament">
          <span class="bold-text">Temperament: </span>
          ${temperament}
        </p>
      </div>`
    )
    .join('');
}

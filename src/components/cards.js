export function createCard(card, onRemoveCard, addLikeCard, openImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  deleteButton.addEventListener('click', onRemoveCard);
  likeButton.addEventListener('click', addLikeCard);
  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', function () {
    openImage(card);
  });
  
  return cardItem;
}

export function handleLikeCard(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
  }
}

export function handleDeleteCard(event) {
  event.target.closest('.places__item').remove();
}

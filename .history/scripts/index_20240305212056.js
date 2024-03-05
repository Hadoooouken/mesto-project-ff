function addCard(card, onRemoveCard) {
  const placesList = document.querySelector('.places__list');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onRemoveCard);
  cardItem.querySelector('.card__image').src = card.link;
  cardItem.querySelector('.card__title').textContent = card.name;
  placesList.append(cardItem);
}

function hendleDeleteCard(event) {
  event.target.closest('.places__item').remove();
}

initialCards.forEach(function (card) {
  addCard(card, hendleDeleteCard);
});

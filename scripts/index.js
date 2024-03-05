const placesList = document.querySelector('.places__list');
function addCard(card, onRemoveCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', onRemoveCard);
  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  return cardItem;
}

function handleDeleteCard(event) {
  event.target.closest('.places__item').remove();
}

initialCards.forEach(function (card) {
  const newCard = addCard(card, handleDeleteCard);
  placesList.append(newCard);
});

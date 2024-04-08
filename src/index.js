import { initialCards } from '../scripts/cards.js';
import '../src/index.css'; // добавьте импорт главного файла стилей
const placesList = document.querySelector('.places__list');
const editPopupButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup')

function openPopup(popupElement) {
  popupElement.classList.add('.popup_is-opened');
}

editPopupButton.addEventListener('click', function () {
  openPopup(popup);
});

addButton.addEventListener('click', function () {
  openPopup(popup);
});

function addCard(card, onRemoveCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
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
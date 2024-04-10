import { initialCards } from '../scripts/cards.js';
import '../src/index.css'; 
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const modalCloseButton = document.querySelectorAll('.popup__close');


modalCloseButton.forEach(function (button) {
  button.addEventListener('click', function () {
    button.closest('.popup').classList.remove('popup_is-opened');
  });
});

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
}

addButton.addEventListener('click', function () {
  openModal(editModal);
});

editButton.addEventListener('click', function () {
  openModal(addModal);
});

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(evt) {
  if (evt.key.toLowerCase() === 'escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

function closeModalByClickOnOverlay(evt, popup) {
  if(evt.target.classList.contains('popup')) {
    closeModal(popup);
  };
}



// function closeModalByEscape(evt) {
//   if (evt.key === 'escape') {
//     addSong(artistInput.value, titleInput.value);
//   }

//    if (evt.key.toLowerCase() === 'ё') {
//     evt.preventDefault()
//   }

//}
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

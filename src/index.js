import { initialCards } from './scripts/cards.js';

import '../src/index.css';

const placesList = document.querySelector('.places__list');

const addNewCardModal = document.querySelector('.popup_type_new-card');
const addNewCardForm = addNewCardModal.querySelector('.popup__form');
const addNewCardButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const modalCloseButton = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameInputCurrent = document.querySelector('.profile__title');
const jobInputCurrent = document.querySelector('.profile__description');

const imageModal = document.querySelector('.popup_type_image')

addNewCardButton.addEventListener('click', function () {
  openModal(addNewCardModal);
});

editProfileButton.addEventListener('click', function () {
  openModal(editProfileModal);
});

modalCloseButton.forEach(function (button) {
  button.addEventListener('click', function () {
    button.closest('.popup').classList.remove('popup_is-opened');
  });
});

document.addEventListener('click', function (event) {
  closeModalByClickOnOverlay(event, addNewCardModal);
  closeModalByClickOnOverlay(event, editProfileModal);
});

editProfileForm.addEventListener('submit', handleFormSubmit);

initialCards.forEach(function (card) {
  const newCard = createCard(card, handleDeleteCard, handleLikeCard);
  placesList.append(newCard);
});

currentValueProfile();

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInputCurrent.textContent = nameInput.value;
  jobInputCurrent.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function closeModalByClickOnOverlay(event, popup) {
  if (event.target.classList.contains('popup')) {
    closeModal(popup);
  }
}

function currentValueProfile() {
  nameInput.value = nameInputCurrent.textContent;
  jobInput.value = jobInputCurrent.textContent;
}

function createCard(card, onRemoveCard, likeCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  deleteButton.addEventListener('click', onRemoveCard);
  likeButton.addEventListener('click', likeCard);
  cardItem.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

 return cardItem;
}

function handleLikeCard(event) {
if (event.target.classList.contains('card__like-button')) {
  event.target.classList.toggle('card__like-button_is-active');
}
}

function handleDeleteCard(event) {
  event.target.closest('.places__item').remove();
}

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(evt) {
  if (evt.key && evt.key.toLowerCase() === 'escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}

addNewCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const inputName = addNewCardForm.querySelector(
    '.popup__input_type_card-name'
  );
  const inputUrl = addNewCardForm.querySelector('.popup__input_type_url');
  const card = {
    name: inputName.value,
    link: inputUrl.value,
  };
  const newCard = createCard(card, handleDeleteCard, handleLikeCard);
  console.log(card)
  addNewCardForm.reset();
  closeModal(addNewCardModal);
  placesList.prepend(newCard);
});

import { createCard, handleLikeCard, handleDeleteCard } from './cards.js';

import { initialCards } from './initialCards.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import {enableValidation, clearValidation, validationConfig} from './validation.js';

import '/src/index.css';

const placesList = document.querySelector('.places__list');

const addNewCardModal = document.querySelector('.popup_type_new-card');
const addNewCardForm = addNewCardModal.querySelector('.popup__form');
const addNewCardButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const modalCloseButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameInputCurrent = document.querySelector('.profile__title');
const jobInputCurrent = document.querySelector('.profile__description');

const imageModal = document.querySelector('.popup_type_image');
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');

const inputName = addNewCardForm.querySelector('.popup__input_type_card-name');
const inputUrl = addNewCardForm.querySelector('.popup__input_type_url');

addNewCardButton.addEventListener('click', function () {
  openModal(addNewCardModal);
});

editProfileButton.addEventListener('click', function () {
  const formElement = editProfileModal.querySelector(validationConfig.formSelector)
  openModal(editProfileModal);
  fillProfileInputs()
  clearValidation(formElement, validationConfig)
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

modalCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
    const formElement = button.closest('.popup').querySelector(validationConfig.formSelector);
    clearValidation(formElement, validationConfig);
  });
});

[addNewCardModal, editProfileModal, imageModal].forEach((modal) => {
  modal.addEventListener('mousedown', function (event) {
    closeModalByClickOnOverlay(event, modal);
  });
});

initialCards.forEach(function (card) {
  const newCard = createCard(
    card,
    handleDeleteCard,
    handleLikeCard,
    openImageModal
  );
  placesList.append(newCard);
});

fillProfileInputs();

enableValidation(validationConfig);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputCurrent.textContent = nameInput.value;
  jobInputCurrent.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function fillProfileInputs() {
  nameInput.value = nameInputCurrent.textContent;
  jobInput.value = jobInputCurrent.textContent;
}

function openImageModal(card) {
  imageModalImage.src = card.link;
  imageModalImage.alt = card.name;
  imageModalCaption.textContent = card.name;
  openModal(imageModal);
}

addNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
const formElement = addNewCardModal.querySelector(validationConfig.formSelector)
  const card = {
    name: inputName.value,
    link: inputUrl.value,
  };

  const newCard = createCard(
    card,
    handleDeleteCard,
    handleLikeCard,
    openImageModal
  );
  addNewCardForm.reset();
  closeModal(addNewCardModal);
  clearValidation(formElement, validationConfig);
  placesList.prepend(newCard);
  
});

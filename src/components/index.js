import { initialCards, createCard, handleLikeCard, handleDeleteCard } from './cards.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import '/src/index.css';


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

const imageModal = document.querySelector('.popup_type_image');


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
  closeModalByClickOnOverlay(event, imageModal);
});

editProfileForm.addEventListener('submit', handleFormSubmit);

initialCards.forEach(function (card) {
  const newCard = createCard(
    card,
    handleDeleteCard,
    handleLikeCard,
    openImageModal
  );
  placesList.append(newCard);
});

currentValueProfile();

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInputCurrent.textContent = nameInput.value;
  jobInputCurrent.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function currentValueProfile() {
  nameInput.value = nameInputCurrent.textContent;
  jobInput.value = jobInputCurrent.textContent;
}

function openImageModal(card) {
  const imageModalImage = imageModal.querySelector('.popup__image');
  const imageModalCaption = imageModal.querySelector('.popup__caption');
  imageModalImage.src = card.link;
  imageModalImage.alt = card.name;
  imageModalCaption.textContent = card.name;

  openModal(imageModal);
}

addNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const inputName = addNewCardForm.querySelector('.popup__input_type_card-name');
  const inputUrl = addNewCardForm.querySelector('.popup__input_type_url');
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
  placesList.prepend(newCard);
});






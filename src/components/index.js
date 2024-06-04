import { createCard, handleLikeCard, handleDeleteCard } from './cards.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './validation.js';

import { userId, fetchUserData,fetchCards,updateUserData,fetchAddСardToServer,updateAvatar } from './api.js';

import '/src/index.css';

const placesList = document.querySelector('.places__list');

const addNewCardModal = document.querySelector('.popup_type_new-card');
const addNewCardForm = addNewCardModal.querySelector('.popup__form');
const addNewCardButton = document.querySelector('.profile__add-button');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = editProfileModal.querySelector('.popup__form');
const editProfileButton = document.querySelector('.profile__edit-button');

const editProfileAvatarModal = document.querySelector('.popup_type_edit_avatar');
const editProfileAvatarForm = editProfileAvatarModal.querySelector('.popup__form');
const editProfileAvatarImage = document.querySelector('.profile__image');
const profileAvatarinput = editProfileAvatarForm.querySelector('.popup__input_type_profile-url');

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


addNewCardButton.addEventListener('click', () => {
  const formElement = addNewCardModal.querySelector(validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  addNewCardForm.reset(); //переместил функционал сюда из modalCloseButtons
  openModal(addNewCardModal);
});


editProfileButton.addEventListener('click', () => {
  const formElement = editProfileModal.querySelector(validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  openModal(editProfileModal);
});

editProfileAvatarForm.addEventListener('submit', updateProfileAvatarSubmit);


editProfileForm.addEventListener('submit', handleProfileFormSubmit);


fillProfileInputs();


enableValidation(validationConfig);


modalCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  });
});


[addNewCardModal, editProfileModal, imageModal, editProfileAvatarModal].forEach(
  (modal) => {
    modal.addEventListener('mousedown', function (event) {
      closeModalByClickOnOverlay(event, modal);
    });
  }
);


function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputCurrent.textContent = nameInput.value;
  jobInputCurrent.textContent = jobInput.value;
  addPreloader(evt)
  updateUserData(nameInput.value, jobInput.value).finally(() =>
    closeModal(editProfileModal)
  ).finally(() => {
    removePreloader(evt)
  })
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


// функция, отображающая данные пользователя на странице
function renderUserData() {
  fetchUserData()
    .then((res) => {
      nameInputCurrent.textContent = res.name;
      jobInputCurrent.textContent = res.about;
      editProfileForm.elements['name-input'].value = res.name;
      editProfileForm.elements['description-input'].value = res.about;
      editProfileAvatarImage.style['background-image'] = `url('${res.avatar}')`;
    })
    .catch((err) => console.log(err));
}

//выводим карточки на страницу
function addInitialCards() {
  fetchCards().then((res) => {
    res.forEach(function (card) {
      const newCard = createCard(
        card,
        handleDeleteCard,
        handleLikeCard,
        openImageModal,
        userId
      );
      placesList.append(newCard);
    });
  });
}

addNewCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const formElement = addNewCardModal.querySelector(
    validationConfig.formSelector
  );
  const cardData = {
    name: inputName.value,
    link: inputUrl.value,
    owner: {
      _id: userId,
    },
  };

  addPreloader(evt)
  fetchAddСardToServer(inputName.value, inputUrl.value)
  .then((cardData) => {
   
    const newCard = createCard(
      cardData,
      handleDeleteCard,
      handleLikeCard,
      openImageModal,
      userId
    );
    placesList.prepend(newCard);
  }).finally(() => {
    removePreloader(evt)
  })

  addNewCardForm.reset();
  closeModal(addNewCardModal);
  clearValidation(formElement, validationConfig)
});


editProfileAvatarImage.addEventListener('click', () => {
  const formElement = editProfileAvatarModal.querySelector(validationConfig.formSelector);

  editProfileAvatarForm.reset()
  openModal(editProfileAvatarModal);
  
});


function updateProfileAvatarSubmit(evt) {
  evt.preventDefault();
  const formElement = editProfileAvatarModal.querySelector(validationConfig.formSelector);
  const profilePictureUrl = profileAvatarinput.value;
  addPreloader(evt)
  updateAvatar(profilePictureUrl)
  .then(() => {
    editProfileAvatarImage.style['background-image'] = `url('${profilePictureUrl}')`;
    closeModal(editProfileAvatarModal);
    clearValidation(formElement, validationConfig);
    })
    .finally(() => {
      removePreloader(evt)
    })
}

function addPreloader (evt) {
  evt.submitter.textContent = 'Сохранение...'
}

function removePreloader (evt) {
  evt.submitter.textContent = 'Сохранить'
}

//промисс с юзером и карточками
const promises = [renderUserData, addInitialCards];
Promise.all(promises).then((arr) => arr.forEach((res) => res()));
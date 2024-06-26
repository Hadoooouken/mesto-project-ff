import { createCard, handleLikeCard } from './card.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import { enableValidation, clearValidation } from './validation.js';

import {
  userId,
  fetchUserData,
  fetchCards,
  updateUserData,
  fetchAddСardToServer,
  updateAvatar,
  fetchDeleteCardFromServer,
  checkImageUrl
} from './api.js';

import '/src/index.css';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const placesList = document.querySelector('.places__list');
const allModals = document.querySelectorAll('.popup')

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

const deleteCardModal = document.querySelector('.popup_type_card-remove')
const deleteCardForm = deleteCardModal.querySelector('.popup__form')


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



deleteCardForm.addEventListener('submit', () => {
  const id = deleteCardForm.getAttribute('id')
  fetchDeleteCardFromServer(id)
  .then(() => {
    document.getElementById(id).remove()
  })
  .catch((err) => console.log(err))
  .finally(() => closeModal(deleteCardModal))
})




addNewCardButton.addEventListener('click', () => {
  const formElement = addNewCardModal.querySelector(
    validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  addNewCardForm.reset();
  openModal(addNewCardModal);
});

editProfileButton.addEventListener('click', () => {
  const formElement = editProfileModal.querySelector(
    validationConfig.formSelector
  );
  clearValidation(formElement, validationConfig);
  fillProfileInputs();
  openModal(editProfileModal);
});


editProfileAvatarForm.addEventListener('submit', updateProfileAvatarSubmit);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

nameInputCurrent.addEventListener('click', () => {
  openModal(deleteCardModal)
});


fillProfileInputs();

enableValidation(validationConfig);

modalCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closeModal(button.closest('.popup'));
  });
});


allModals.forEach((modal) => {
  modal.addEventListener('mousedown', (event) => {
    closeModalByClickOnOverlay(event, modal)
  } )
})

function openCardRemovalConfirmationModal (id) {
  openModal(deleteCardModal);
  deleteCardForm.setAttribute("id", id);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  addPreloader(evt);
  updateUserData(nameInput.value, jobInput.value)
    .then((res) => {
      nameInputCurrent.textContent = res.name;
      jobInputCurrent.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removePreloader(evt);
      closeModal(editProfileModal);
    });
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
function renderUserData(userInfo) {
  nameInputCurrent.textContent = userInfo.name;
  jobInputCurrent.textContent = userInfo.about;
  editProfileForm.elements['name-input'].value = userInfo.name;
  editProfileForm.elements['description-input'].value = userInfo.about;
  editProfileAvatarImage.style[
    'background-image'
  ] = `url('${userInfo.avatar}')`;
}

//выводим карточки на страницу
function addInitialCards(cards) {
  cards.forEach((card) => {
    const newCard = createCard(
      card,
      openCardRemovalConfirmationModal,
      handleLikeCard,
      openImageModal,
      userId
    );
    placesList.append(newCard);
  });
}

addNewCardForm.addEventListener('submit', (evt) => {
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
  addPreloader(evt);
  fetchAddСardToServer(inputName.value, inputUrl.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        openCardRemovalConfirmationModal,
        handleLikeCard,
        openImageModal,
        userId
      );
      placesList.prepend(newCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      removePreloader(evt);
      closeModal(addNewCardModal);
      clearValidation(formElement, validationConfig);
      addNewCardForm.reset();
    });
});

editProfileAvatarImage.addEventListener('click', () => {
  const formElement = editProfileAvatarModal.querySelector(validationConfig.formSelector);
  clearValidation(formElement, validationConfig);
  editProfileAvatarForm.reset();
  openModal(editProfileAvatarModal);
});


function updateProfileAvatarSubmit(evt) {
  evt.preventDefault();
  const formElement = editProfileAvatarModal.querySelector(validationConfig.formSelector);
  const url = profileAvatarinput.value;
  addPreloader(evt);
  updateAvatar(url)
    .then((res) => {
      const profilePictureUrl = res.avatar;
      editProfileAvatarImage.style[
        'background-image'
      ] = `url('${profilePictureUrl}')`;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      removePreloader(evt);
      closeModal(editProfileAvatarModal);
      clearValidation(formElement, validationConfig);
      editProfileAvatarForm.reset();
    });
}

function addPreloader(evt) {
  evt.submitter.textContent = 'Сохранение...';
}

function removePreloader(evt) {
  evt.submitter.textContent = 'Сохранить';
}

const promises = [fetchUserData(), fetchCards()];
Promise.all(promises)
  .then(([userInfo, cards]) => {
    renderUserData(userInfo);
    addInitialCards(cards);
  })
  .catch((err) => console.log(err));

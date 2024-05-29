import { createCard, handleLikeCard, handleDeleteCard } from './cards.js';


import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './validation.js';

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
  const formElement = addNewCardModal.querySelector(
    validationConfig.formSelector
  );
  clearValidation(formElement, validationConfig);
  addNewCardForm.reset(); //переместил функционал сюда из modalCloseButtons
  openModal(addNewCardModal);
});

editProfileButton.addEventListener('click', function () {
  const formElement = editProfileModal.querySelector(
    validationConfig.formSelector
  );
  openModal(editProfileModal);
  fillProfileInputs();
  clearValidation(formElement, validationConfig);
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit) ;

modalCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
    // const formElement = button.closest('.popup').querySelector(validationConfig.formSelector);
    // clearValidation(formElement, validationConfig);
    // addNewCardForm.reset();  баг нашел, при закрытии увеличенной картинки на крестик - не может прочитать свойста querySelector
  });
});

[addNewCardModal, editProfileModal, imageModal].forEach((modal) => {
  modal.addEventListener('mousedown', function (event) {
    closeModalByClickOnOverlay(event, modal);
  });
});


fillProfileInputs();

enableValidation(validationConfig);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputCurrent.textContent = nameInput.value;
  jobInputCurrent.textContent = jobInput.value;
  updateUserData(nameInput.value, jobInput.value)
  .catch((err) => console.log(err))
  .finally(() => closeModal(editProfileModal))
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
  const formElement = addNewCardModal.querySelector(
    validationConfig.formSelector
  );
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

const serverURL = 'https://nomoreparties.co/v1/wff-cohort-14/';
const token = '87aba88c-73fd-4f0c-8e8e-c85e9a40fa5a';
let userId; //id авторизованного пользователя

const fetchUserId = (id) => {
  userId = id;
}; // получить id пользователя

// запрашиваем данные о пользователе
const fetchUserData = () => {
  return fetch(`${serverURL}users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      fetchUserId(res['_id']);
      return res;
    });
};

//забираем карточки с сервера
const fetchCards = () => {
  return fetch(`${serverURL}cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
  // .then((res) => {
  //   console.log(res);
  // });
};

// функция, отображающая данные пользователя на странице
function renderUserData() {
  fetchUserData()
  .then((res) => {
    nameInputCurrent.textContent = res.name;
    jobInputCurrent.textContent = res.about;
    editProfileForm.elements['name-input'].value = res.name
    editProfileForm.elements['description-input'].value = res.about
  
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
        openImageModal
      );
      placesList.append(newCard);
    });
  });
}

//промисс с юзером и карточками
const promises = [renderUserData, addInitialCards];
Promise.all(promises).then((resArr) => resArr.forEach((res) => res()));



const updateUserData = (name, about) => {
  return fetch(`${serverURL}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};









//с урока писал

// const handleResponse = (res) => {
//   if(res.ok) {
//     return res.json()
//   }
// }
// const getAllToDos = () => {
//   return fetch(serverURL, {
//     method: 'GET',
//     headers: {
//       authorization: token,
//         }
//        }) .then(handleResponse)

// }

// const createToDo = () => {
//   return fetch(serverURL, {
//     method: 'POST',
//     headers: {
//       authorization: token,
//       'Content-type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: name,
//         link: link,
//       }),
//        }) .then(handleResponse)
// }

// Promise.all([getAllToDos(), createToDo()])
// .then(([todos, newCard]) => {
//   console.log(todos, newCard)
// })

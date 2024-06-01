import { createCard, handleLikeCard, handleDeleteCard } from './cards.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './validation.js';

import {
  userId,
  fetchUserId,
  fetchUserData,
  fetchCards,
  updateUserData,
  fetchAddСardToServer,
  fetchDeleteCardFromServer,
  addLike,
  removeLike,
} from './api.js';

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

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

modalCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
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
  updateUserData(nameInput.value, jobInput.value).finally(() =>
    closeModal(editProfileModal)
  );
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
  fetchAddСardToServer(inputName.value, inputUrl.value);
  addNewCardForm.reset();
  closeModal(addNewCardModal);
  clearValidation(formElement, validationConfig);
  placesList.prepend(newCard);
});

//промисс с юзером и карточками
const promises = [renderUserData, addInitialCards];
Promise.all(promises)
.then((arr) => arr.forEach((res) => res()));

//функция на удаление карточки

//функция на удаление карточки изначальная
// function deleteCardFromServer(evt) {
//   const id = evt.target.id;
//   const card = document.getElementById(id);
//   fetchDeleteCardFromServer(card.id)
//   .then(() => {
//     card.remove();
//   })

// }

// const handleLikeIconClick = (cardID, likeButton, likesCount) => {
//   const isLiked = likeButton.classList.contains("card__like-button_is-active"); // смотрим лайкнута ли карточка или нет
//   функцияЗапросаЛайка(cardID, !isLiked) // можно объединить в одну, и на основе isLiked понимать лайк или снятие лайка
//     .then((cardData) => {
//        // переключаем лайкнутость
// // изменяем количество лайков исходя из длины массива
//     })
//     .catch((err) => (...));
// };

// // чтобы у нас имеклись все необходимые данные для вычисления isLiked и т.д., вызываем нашу функцию следующим образом

//  likeButton.addEventListener("click", () =>
//       onLike(data._id, likeButton, likesCount) // по сколько карточка создается с сервера, в ней должны быть данные name, link, id и прочее. Если их нет - добавь. Удобнее данные карточки передавать объектом, а не по одному.
//     );

//с урока писал

// const handleResponse = (res) => {
//   if(res.ok) {
//     return res.json()
//   }
// }

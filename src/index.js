import { initialCards } from '../scripts/cards.js';
import '../src/index.css';
const placesList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const editModal = document.querySelector('.popup_type_edit');
const addModal = document.querySelector('.popup_type_new-card');
const modalCloseButton = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');

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
  openModal(addModal);
});

editButton.addEventListener('click', function () {
  openModal(editModal);
});

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc, closeModalByEsc);
}

function closeModalByEsc(evt) {
  if (evt.key.toLowerCase() === 'escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  }
}

function closeModalByClickOnOverlay(event, popup) {
  if (event.target.classList.contains('popup')) {
    closeModal(popup);
  }
}
document.addEventListener('click', function (event) {
  closeModalByClickOnOverlay(event, addModal);
  closeModalByClickOnOverlay(event, editModal);
});


// function fillInProfileFormInputs() {
//   nameInput.value = defaultNameInput.textContent;
//   jobInput.value = defaultJobInput.textContent;

// }
// fillInProfileFormInputs();

// // Находим форму в DOM
// const formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// const nameInput = // Воспользуйтесь инструментом .querySelector()
// const jobInput = // Воспользуйтесь инструментом .querySelector()

// // // Обработчик «отправки» формы, хотя пока
// // // она никуда отправляться не будет
// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   const jobOutput = formElement.elements.description.value;
//   const nameOutput = formElement.elements.name.value;
//   const nameInput = document.querySelector('.popup__input_type_name');
//   const jobInput = document.querySelector('.popup__input_type_description');
//   nameInput.textContent = nameOutput;
//   jobInput.textContent = jobOutput;
// }

// formElement.addEventListener('submit', handleFormSubmit);

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

// Функция closeModalByClickOnOverlay принимает два аргумента: event и popup.
// Первый аргумент, event, представляет собой событие клика. Это означает, что функция будет выполняться каждый раз, когда пользователь
// кликает на элемент с классом popup. В данном случае, это, вероятно, оверлей модального окна.
// Второй аргумент, popup, это ссылка на само модальное окно.
// Внутри функции, мы проверяем, есть ли у цели клика (event.target) класс popup. Если да, то мы вызываем функцию closeModal с
// аргументом popup, который, вероятно, закрывает модальное окно.
// В итоге, функция проверяет, был ли клик по оверлею модального окна, и если да, то закрывает это модальное окно.
// Затем, в коде, который вы предоставили, мы добавляем слушатель события click на документ. Когда пользователь кликает на страницу,
//  мы вызываем функцию closeModalByClickOnOverlay, передавая ей event (событие клика) и addModal или editModal (в зависимости от того,
//    какое модальное окно было открыто). Это делает код, который мы рассмотрели, более понятным и функциональным.

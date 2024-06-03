import { createCard, handleLikeCard, handleDeleteCard } from './cards.js';

import { openModal, closeModal, closeModalByClickOnOverlay } from './modal.js';

import {
  enableValidation,
  clearValidation,
  validationConfig,
} from './validation.js';

import {
  userId,
  fetchUserData,
  fetchCards,
  updateUserData,
  fetchAddСardToServer,
  updateAvatar

} from './api.js';

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
const editProfileAvatarImage = document.querySelector('.profile__image')
const profileInput = editProfileAvatarForm.querySelector('.popup__input_type_profile-url')
console.log(profileInput.value)

editProfileAvatarImage.addEventListener('click', function() {
  const formElement = editProfileAvatarModal.querySelector(
    validationConfig.formSelector)
  clearValidation(formElement, validationConfig)
  editProfileAvatarForm.reset()
  openModal(editProfileAvatarModal)
})



//не работает завтра проверить
// editProfileAvatarForm.addEventListener('submit', (updateAvataruser))


// function updateAvataruser(evt) {
//   evt.preventDefault()
//   const profilePictureUrl = editProfileAvatarImage.style.backgroundImage.value
//   .then(() => {
//     updateUserAvatar(profilePictureUrl)
//       .then(() => {
//         editProfileAvatarImage.style.backgroundImage = `url('${profilePictureUrl}')`;
//         closeModal(editProfileAvatarModal);
        
//       })
// })
// }



//     })
//1 вариант

// function updateAvatarr(url) {
//   editProfileAvatarImage.style.backgroundImage = `url("${url}")`;
// }

// editProfileAvatarForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const url = profileInput.value;
//   updateAvatarr(url)
  
//   .then ((url) =>
//     updateAvatar(url))
//   closeModal(editProfileAvatarModal)
  
// });


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
  ;
 
  clearValidation(formElement, validationConfig);
  openModal(editProfileModal)
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

modalCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    closeModal(button.closest('.popup'));
  });
});

[addNewCardModal, editProfileModal, imageModal, editProfileAvatarModal].forEach((modal) => {
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
  }); 
  
  addNewCardForm.reset();
  closeModal(addNewCardModal);
  clearValidation(formElement, validationConfig);
 
});


//промисс с юзером и карточками
const promises = [renderUserData, addInitialCards];
Promise.all(promises).then((arr) => arr.forEach((res) => res()));

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
//       onLike(data._id, likeButton, likesCount) // 
// по сколько карточка создается с сервера, в ней должны быть данные name, link, id и прочее. 
// Если их нет - добавь. Удобнее данные карточки передавать объектом, а не по одному.
// //     );

//с урока писал

// const handleResponse = (res) => {
//   if(res.ok) {
//     return res.json()
//   }
// }

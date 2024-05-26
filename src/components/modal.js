export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
   
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
}

export function closeModalByClickOnOverlay(event, popup) {
  if (event.target.classList.contains('popup')) {
    closeModal(popup);
  }
}

export function closeModalByEsc(evt) {
  if (evt.key) {
    if (evt.key.toLowerCase() === 'escape') {
      const popupOpened = document.querySelector('.popup_is-opened');
      closeModal(popupOpened);
    }
  }
}

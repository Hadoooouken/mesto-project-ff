import { removeLike, addLike } from './api.js';

export function createCard(card, onRemoveCard, addLikeCard, openImage, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardLikeCount = cardItem.querySelector('.card__like-count');

  likeButton.addEventListener('click', addLikeCard);

  cardItem.querySelector('.card__title').textContent = card.name;

  const cardId = card['_id'];
  cardItem.setAttribute('id', cardId);
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (card.owner['_id'] === userId) {
    deleteButton.addEventListener('click', () => {
      onRemoveCard(cardId)
    });
  } else {
    deleteButton.remove();
  }
  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardLikeCount.textContent = card['likes'] ? card['likes'].length : 0;
  cardImage.addEventListener('click', () => {
    openImage(card);
  });

  return cardItem;
}


export function handleLikeCard(event) {
  if (event.target.classList.contains('card__like-button')) {
    const isActive = event.target.classList.contains('card__like-button_is-active');
    const cardItem = event.target.closest('.places__item');
    const id = cardItem.id;
    const cardLikeCount = cardItem.querySelector('.card__like-count');
    const likeMethod = isActive ? removeLike : addLike;
    likeMethod(id)
      .then((res) => {
        event.target.classList.toggle('card__like-button_is-active');
        cardLikeCount.textContent = res.likes.length;
      })
      .catch((err) => console.log(err));
  }
}


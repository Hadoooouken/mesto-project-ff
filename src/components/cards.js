import { fetchDeleteCardFromServer, userId} from "./api.js";


export function createCard(card, onRemoveCard, addLikeCard, openImage,) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardLikeCount = cardItem.querySelector('.card__like-count')
  
  likeButton.addEventListener('click', addLikeCard);
  cardItem.querySelector('.card__title').textContent = card.name;
  const cardId = card['_id']
  cardItem.setAttribute('id', cardId)
  cardImage.src = card.link;
  cardImage.alt = card.name;
  if (card.owner['_id'] === userId) {
    deleteButton.addEventListener('click', onRemoveCard);
  } else {
    deleteButton.remove()
  }
  cardLikeCount.textContent = card['likes'] ? card['likes'].length : 0;
  cardImage.addEventListener('click', () => {
    openImage(card);
  });


  
  return cardItem;
}



export function handleLikeCard(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.target.classList.toggle('card__like-button_is-active');
  }
}

export function handleDeleteCard(event) {
  event.preventDefault()
  const id = event.target.id
  console.log(id)
  fetchDeleteCardFromServer(id)
  .then(() => {
    event.target.closest('.places__item').remove();
    
  })

}



//изначально вот так было
// export function handleDeleteCard(event) {
//   event.target.closest('.places__item').remove();
// }

// export function handleDeleteCard(evt) {
//   const id = evt.target.id;
//   const card = evt.target.closest('.card');
//   card.remove();
//   fetchDeleteCardFromServer(card.id)
//   .then(() => {
    
//   })
  
// }

//import { fetchDeleteCardFromServer } from "./index";
// function deleteCardFromServer(evt) {
//   const id = evt.target.id;
//   const card = evt.target.closest('.card');
//   card.remove();
//   fetchDeleteCardFromServer(card.id)
//   .then(() => {
    
//   })
  
// }
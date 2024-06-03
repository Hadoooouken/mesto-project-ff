const serverURL = 'https://nomoreparties.co/v1/wff-cohort-14/';
const token = '87aba88c-73fd-4f0c-8e8e-c85e9a40fa5a';
export let userId; //id авторизованного пользователя


// получить id пользователя
export const fetchUserId = (id) => {
  userId = id;
}; 

// запрашиваем данные о пользователе
export const fetchUserData = () => {
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

//запрос на карточки с сервера
export const fetchCards = () => {
  return fetch(`${serverURL}cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
};

//запрос на обновление данных
export const updateUserData = (name, about) => {
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
  
  //запрос на добавление карточки
  export const fetchAddСardToServer = (name, link) => {
    return fetch(`${serverURL}cards`, {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((card) => card.json())
  };
  
  
  //запрос на удаление карточки
  export const fetchDeleteCardFromServer = (cardId) => {
    return fetch(`${serverURL}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token
      }
    }).then((card) => card.json())
  };

  //запрос на постановку лайка
  export const addLike = (cardId) => {
    return fetch(`${serverURL}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      }
    }).then((card) => card.json())
  }
  
  export const removeLike = (cardId) => {
    return fetch(`${serverURL}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      }
    }).then((card) => card.json())
  }

 // запрос на аватар
  export const updateAvatar = (url) => {
    return fetch(`${serverURL}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
  }
  
  
  

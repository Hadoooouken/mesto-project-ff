const serverURL = 'https://nomoreparties.co/v1/wff-cohort-14/';
const token = '87aba88c-73fd-4f0c-8e8e-c85e9a40fa5a';
export let userId;

// const handleResponse = (res) => {
//   if(res.ok) {
//     return res.json()
//   }
// }



export const fetchUserId = (id) => {
  userId = id;
};


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


export const fetchCards = () => {
  return fetch(`${serverURL}cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then((res) => res.json());
};


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
  }).then((card) => card.json());
};


export const fetchDeleteCardFromServer = (cardId) => {
  return fetch(`${serverURL}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  }).then((card) => card.json());
};


export const addLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
  }).then((card) => card.json());
};

export const removeLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
  }).then((card) => card.json());
};


export const updateAvatar = (url) => {
  return fetch(`${serverURL}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      avatar: url,
    }),
  });
};

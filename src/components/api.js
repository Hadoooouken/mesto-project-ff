const serverURL = 'https://nomoreparties.co/v1/wff-cohort-14/';
const token = '87aba88c-73fd-4f0c-8e8e-c85e9a40fa5a';
export let userId;

export const setUserId = (id) => {
  userId = id;
};

export const fetchUserData = () => {
  return fetch(`${serverURL}users/me`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  })
    .then(handleResponse)
    .then((res) => {
      setUserId(res['_id']);
      return res;
    });
};

export const fetchCards = () => {
  return fetch(`${serverURL}cards`, {
    method: 'GET',
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
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
  }).then(handleResponse);
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
  }).then(handleResponse);
};

export const fetchDeleteCardFromServer = (cardId) => {
  return fetch(`${serverURL}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
    },
  }).then(handleResponse);
};

export const addLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
  }).then(handleResponse);
};

export const removeLike = (cardId) => {
  return fetch(`${serverURL}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-type': 'application/json',
    },
  }).then(handleResponse);
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
  }).then(handleResponse);
};


const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};


// export function checkImageUrl(url) {
//   return fetch(url, { method: 'HEAD' })
//     .then(response => {
//       const contentType = response.headers.get('Content-Type');
//       if (response.ok && contentType && contentType.includes('image')) {
//         return { isValid: true, contentType };
//       } else {
//         return { isValid: false };
//       }
//     })
//     .catch(error => {
//       console.error('Ошибка при запросе URL:', error);
//       return { isValid: false };
//     });
// }

// function updateProfileAvatarSubmit(evt) {
//   evt.preventDefault();
//   const formElement = editProfileAvatarModal.querySelector(validationConfig.formSelector);
//   const url = profileAvatarinput.value;
//   addPreloader(evt);


//   checkImageUrl(url)
//     .then((imageCheckResult) => {
//       if (imageCheckResult.isValid) {
//         // Если URL действителен, обновляем аватар
//         return updateAvatar(url);
//       } else {
//         throw new Error('URL не является действительным изображением');
//       }
//     })
//     .then((res) => {
//       const profilePictureUrl = res.avatar;
//       editProfileAvatarImage.style['background-image'] = `url('${profilePictureUrl}')`;
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       removePreloader(evt);
//       closeModal(editProfileAvatarModal);
//       clearValidation(formElement, validationConfig);
//       editProfileAvatarForm.reset();
//     });
// }

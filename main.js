(()=>{"use strict";var e,t="https://nomoreparties.co/v1/wff-cohort-14/",n="87aba88c-73fd-4f0c-8e8e-c85e9a40fa5a",o=function(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))};function r(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=c.querySelector(".card__image"),a=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),l=c.querySelector(".card__like-count");u.addEventListener("click",n),c.querySelector(".card__title").textContent=e.name;var s=e._id;return c.setAttribute("id",s),i.src=e.link,i.alt=e.name,e.owner._id===r?a.addEventListener("click",t):a.remove(),e.likes.find((function(e){return e._id===r}))&&u.classList.add("card__like-button_is-active"),l.textContent=e.likes?e.likes.length:0,i.addEventListener("click",(function(){o(e)})),c}function c(e){if(e.target.classList.contains("card__like-button")){var r=e.target.classList.contains("card__like-button_is-active"),c=e.target.closest(".places__item"),i=c.id,a=c.querySelector(".card__like-count");r?(u=i,fetch("".concat(t,"cards/likes/").concat(u),{method:"DELETE",headers:{authorization:n,"Content-type":"application/json"}}).then(o)).then((function(t){e.target.classList.toggle("card__like-button_is-active"),a.textContent=t.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(t,"cards/likes/").concat(e),{method:"PUT",headers:{authorization:n,"Content-type":"application/json"}}).then(o)}(i).then((function(t){e.target.classList.toggle("card__like-button_is-active"),a.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}var u}function i(e){console.log(),e.preventDefault(c);var r,c=e.target.closest(".places__item"),i=c.id;(r=i,fetch("".concat(t,"cards/").concat(r),{method:"DELETE",headers:{authorization:n}}).then(o)).then((function(){c.remove()})).catch((function(e){return console.log(e)}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){e.key&&"escape"===e.key.toLowerCase()&&u(document.querySelector(".popup_is-opened"))}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(s.inputErrorClass),n.classList.remove(s.errorClass),n.textContent=""};function d(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(s.inactiveButtonClass)):(t.disabled=!0,t.classList.add(s.inactiveButtonClass))}function f(e,t){var n=e.querySelector(t.submitButtonSelector);n.disabled=!0,n.classList.add(t.inactiveButtonClass),e.querySelectorAll(t.inputSelector).forEach((function(t){p(e,t)}))}var _=document.querySelector(".places__list"),m=document.querySelector(".popup_type_new-card"),y=m.querySelector(".popup__form"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_edit"),S=h.querySelector(".popup__form"),q=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup_type_edit_avatar"),b=g.querySelector(".popup__form"),C=document.querySelector(".profile__image"),E=b.querySelector(".popup__input_type_profile-url"),L=document.querySelectorAll(".popup__close"),k=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__title"),z=document.querySelector(".profile__description"),T=document.querySelector(".popup_type_image"),j=T.querySelector(".popup__image"),w=T.querySelector(".popup__caption"),B=y.querySelector(".popup__input_type_card-name"),D=y.querySelector(".popup__input_type_url");function P(e){j.src=e.link,j.alt=e.name,w.textContent=e.name,a(T)}function N(e){e.submitter.textContent="Сохранение..."}function O(e){e.submitter.textContent="Сохранить"}v.addEventListener("click",(function(){f(m.querySelector(s.formSelector),s),y.reset(),a(m)})),q.addEventListener("click",(function(){f(h.querySelector(s.formSelector),s),a(h)})),b.addEventListener("submit",(function(e){e.preventDefault();var r,c=g.querySelector(s.formSelector),i=E.value;N(e),(r=i,fetch("".concat(t,"users/me/avatar"),{method:"PATCH",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({avatar:r})}).then(o)).then((function(){C.style["background-image"]="url('".concat(i,"')"),u(g),f(c,s)})).catch((function(e){console.log(e)})).catch((function(e){return console.log(e)})).finally((function(){O(e)}))})),S.addEventListener("submit",(function(e){var r,c;e.preventDefault(),A.textContent=k.value,z.textContent=x.value,N(e),(r=k.value,c=x.value,fetch("".concat(t,"users/me"),{method:"PATCH",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({name:r,about:c})}).then(o)).finally((function(){return u(h)})).catch((function(e){return console.log(e)})).finally((function(){O(e)}))})),k.value=A.textContent,x.value=z.textContent,Array.from(document.querySelectorAll(s.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(s.inputSelector)),n=e.querySelector(s.submitButtonSelector);d(t,n),t.forEach((function(o){o.addEventListener("input",(function(){(function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(s.inputErrorClass),o.textContent=n,o.classList.add(s.errorClass)}(e,t,t.validationMessage)})(e,o),d(t,n)}))}))}(e)})),L.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),[m,h,T,g].forEach((function(e){e.addEventListener("mousedown",(function(t){!function(e,t){e.target.classList.contains("popup")&&u(t)}(t,e)}))})),y.addEventListener("submit",(function(a){a.preventDefault();var l,p,d=m.querySelector(s.formSelector);B.value,D.value,N(a),(l=B.value,p=D.value,fetch("".concat(t,"cards"),{method:"POST",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({name:l,link:p})}).then(o)).then((function(t){var n=r(t,i,c,P,e);_.prepend(n)})).catch((function(e){return console.log(e)})).finally((function(){O(a)})),y.reset(),u(m),f(d,s)})),C.addEventListener("click",(function(){g.querySelector(s.formSelector),b.reset(),a(g)}));var J=[function(){fetch("".concat(t,"users/me"),{method:"GET",headers:{authorization:n}}).then(o).then((function(t){var n;return n=t._id,e=n,t})).then((function(e){A.textContent=e.name,z.textContent=e.about,S.elements["name-input"].value=e.name,S.elements["description-input"].value=e.about,C.style["background-image"]="url('".concat(e.avatar,"')")})).catch((function(e){return console.log(e)}))},function(){fetch("".concat(t,"cards"),{method:"GET",headers:{authorization:n}}).then(o).then((function(t){t.forEach((function(t){var n=r(t,i,c,P,e);_.append(n)}))})).catch((function(e){console.log(e)}))}];Promise.all(J).then((function(e){return e.forEach((function(e){return e()}))}))})();
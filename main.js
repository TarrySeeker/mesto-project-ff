(()=>{"use strict";var e={openPopupClass:"popup_is-opened",animatedPopupClass:"popup_is-animated"};function t(t){t.classList.add(e.animatedPopupClass),setTimeout((function(){t.classList.add(e.openPopupClass)}),0),document.addEventListener("keydown",o),t.addEventListener("mousedown",r)}function n(t){t.classList.remove(e.openPopupClass),setTimeout((function(){t.classList.remove(e.animatedPopupClass)}),600),document.removeEventListener("keydown",o),t.removeEventListener("mousedown",r)}function o(t){"Escape"===t.key&&n(document.querySelector("."+e.openPopupClass))}function r(t){t.target.classList.contains(e.openPopupClass)&&n(t.target)}var c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"4c342f59-ab88-4d05-986e-bf4c6061906b","Content-Type":"application/json"}};function a(e){return fetch(c.baseUrl+e,{headers:c.headers}).then(i)}function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"POST";return fetch(c.baseUrl+e,{method:n,headers:c.headers,body:JSON.stringify(t)}).then(i)}var i=function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))},s=document.querySelector("#card-template").content;function l(e,t,n,o,r){var c=s.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__delete-button"),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-counter");return c.id=e._id,r!==e.owner._id?a.remove():a.addEventListener("click",(function(){t(e)})),p(e,r)?l.classList.add("card__like-button_is-active"):l.classList.remove("card__like-button_is-active"),u.src=e.link,u.alt=e.name,i.textContent=e.name,d.textContent=e.likes.length,u.addEventListener("click",n),l.addEventListener("click",(function(){o(e,r,c)})),c}function d(e,t,n){var o=n.querySelector(".card__like-button"),r=n.querySelector(".card__like-counter");p(e,t)?function(e){return u("/cards/likes/".concat(e._id),{},"DELETE")}(e).then((function(t){r.textContent=t.likes.length,o.classList.remove("card__like-button_is-active"),e.likes=t.likes})).catch((function(e){console.log(e)})):function(e){return u("/cards/likes/".concat(e._id),{},"PUT")}(e).then((function(t){r.textContent=t.likes.length,o.classList.add("card__like-button_is-active"),e.likes=t.likes})).catch((function(e){console.log(e)}))}function p(e,t){return e.likes.some((function(e){return e._id===t}))}function f(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function m(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function _(e,t){var n=e.querySelector(t.submitButtonSelector),o=Array.from(e.querySelectorAll(t.inputSelector));o.forEach((function(n){f(e,n,t)})),m(o,n,t)}var v=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),k=document.querySelector(".profile__image"),C=document.querySelector(".popup_avatar"),q=document.forms["change-avatar"],E=q.elements.link,L=C.querySelector(".popup__button"),g=document.querySelector(".popup_type_edit"),x=document.forms["edit-profile"],P=x.elements.name,T=x.elements.description,A=g.querySelector(".popup__button"),w=document.querySelector(".popup_type_new-card"),B=document.forms["new-place"],D=B.elements["place-name"],I=B.elements.link,U=w.querySelector(".popup__button"),j=document.querySelector(".popup_type_image"),M=document.querySelector(".popup__image"),H=document.querySelector(".popup__caption"),N=document.querySelector(".popup_delete-image"),O=N.querySelector(".popup__button"),V=document.querySelectorAll(".popup__close"),z={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},J="";function F(e){M.src=e.target.src,M.alt=e.target.alt,H.textContent=e.target.alt,t(j)}function G(e){t(N),O.dataset.cardId=e._id}function K(e,t){t.textContent=e?"Сохранение...":t.dataset.buttonText}Promise.all([a("/cards"),a("/users/me")]).then((function(e){J=e[1]._id,b.textContent=e[1].name,h.textContent=e[1].about,k.style="background-image: url('".concat(e[1].avatar,"')"),e[0].forEach((function(e){v.append(l(e,G,F,d,J))}))})).catch((function(e){console.log(e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);m(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),m(n,o,t)}))}))}(t,e)}))}(z),k.addEventListener("click",(function(){q.reset(),_(C,z),t(C)})),y.addEventListener("click",(function(){P.value=b.textContent,T.value=h.textContent,_(x,z),t(g)})),S.addEventListener("click",(function(){B.reset(),_(w,z),t(w)})),V.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){n(t)}))})),q.addEventListener("submit",(function(e){var t;e.preventDefault(),K(!0,L),(t=E,u("/users/me/avatar",{avatar:t.value},"PATCH")).then((function(e){k.style="background-image: url('".concat(e.avatar,"')"),n(C),q.reset()})).catch((function(e){return console.log(e)})).finally((function(){K(!1,L)}))})),x.addEventListener("submit",(function(e){var t,o;e.preventDefault(),K(!0,A),(t=P,o=T,u("/users/me",{name:t.value,about:o.value},"PATCH")).then((function(e){b.textContent=e.name,h.textContent=e.about,n(g)})).catch((function(e){return console.log(e)})).finally((function(){K(!1,A)}))})),B.addEventListener("submit",(function(e){var t,o;e.preventDefault(),K(!0,U),(t=D,o=I,u("/cards",{name:t.value,link:o.value})).then((function(e){v.prepend(l(e,G,F,d,J)),n(w),B.reset()})).catch((function(e){return console.log(e)})).finally((function(){K(!1,U)}))})),O.addEventListener("click",(function(e){e.preventDefault();var t=O.dataset.cardId;(function(e){return u("/cards/".concat(e),{},"DELETE")})(t).then((function(){document.getElementById(t).remove(),O.dataset.cardId="",n(N)})).catch((function(e){return console.log(e)}))}))})();
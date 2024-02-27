
import "../pages/index.css";
import { openPopup, closePopup } from "../components/modal";
import { createCard, likeCard } from "../components/card";
import { enableValidation, clearValidation } from "../components/valid";
import {
  deleteCardRequest,
  addCardRequest,
  changeProfileInfoRequest,
  changeAvatarRequest,
  getMyInfoRequest,
  getCardsRequest,
} from "../components/api";

/*-----------------------------------------------------------------------------------
    КОНСТАНТЫ И ПЕРЕМЕННЫЕ
*/

//список карточек
const cardsList = document.querySelector(".places__list");

//кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

//профиль на странице
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

//попап АВАТАР
const popupAvatar = document.querySelector(".popup_avatar");
const popupAvatarForm = document.forms["change-avatar"];
const popupAvatarLinkInput = popupAvatarForm.elements.link;
const popupAvatarButton = popupAvatar.querySelector(".popup__button");

//попап ПРОФИЛЬ
const popupProfile = document.querySelector(".popup_type_edit");
const popupProfileForm = document.forms["edit-profile"];
const popupProfileNameInput = popupProfileForm.elements.name;
const popupProfileDescriptionInput = popupProfileForm.elements.description;
const popupProfileButton = popupProfile.querySelector(".popup__button");

//попап НОВАЯ КАРТОЧКА
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardForm = document.forms["new-place"];
const popupAddCardNameInput = popupAddCardForm.elements["place-name"];
const popupAddCardLinkInput = popupAddCardForm.elements.link;
const popupAddCardButton = popupAddCard.querySelector(".popup__button");

//попап КАРТОЧКА
const popupCard = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(".popup__image");
const popupCardName = document.querySelector(".popup__caption");

//попап ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ КАРТОЧКИ
const popupDeleteCard = document.querySelector(".popup_delete-image");
const popupDeleteCardButton = popupDeleteCard.querySelector(".popup__button");

//кнопки закрытия попапов
const closeButtons = document.querySelectorAll(".popup__close");

//config для валидации форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//мой ID
export let accountId = "";

/*-----------------------------------------------------------------------------------
    
*/

//вывод карточке на страницу
Promise.all([getCardsRequest(), getMyInfoRequest()])
  .then((request) => {
    //получаем ID моего аккаунта
    accountId = request[1]["_id"];

    //заполняем разметку моего аккаунта данными с сервера
    profileName.textContent = request[1].name;
    profileDescription.textContent = request[1].about;
    profileImage.style = `background-image: url('${request[1].avatar}')`;

    //выводим карточки на страницу
    request[0].forEach((card) => {
      cardsList.append(
        createCard(card, deleteMyCard, openPopupImage, likeCard, accountId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//валидация форм
enableValidation(validationConfig);

//слушатель клика по кнопке редактирования аватара
profileImage.addEventListener("click", () => {
  popupAvatarForm.reset();

  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

//слушатель клика по кнопке редактирования профиля
profileEditButton.addEventListener("click", () => {
  popupProfileNameInput.value = profileName.textContent;
  popupProfileDescriptionInput.value = profileDescription.textContent;

  clearValidation(popupProfileForm, validationConfig);
  openPopup(popupProfile);
});

//слушатель клика по кнопке добавления карточки
newCardButton.addEventListener("click", () => {
  popupAddCardForm.reset();

  clearValidation(popupAddCard, validationConfig);
  openPopup(popupAddCard);
});

//слушатель закрытия на все кнопки попапов
closeButtons.forEach((item) => {
  const popup = item.closest(".popup");
  item.addEventListener("click", () => {
    closePopup(popup);
  });
});

//функция открытия попапа с изображением
function openPopupImage(evt) {
  popupCardImage.src = evt.target.src;
  popupCardImage.alt = evt.target.alt;
  popupCardName.textContent = evt.target.alt;

  openPopup(popupCard);
}

//коллбэк сохранения нового аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupAvatarButton);

  changeAvatarRequest(popupAvatarLinkInput)
    .then((res) => {
      profileImage.style = `background-image: url('${res.avatar}')`;

      closePopup(popupAvatar);
      popupAvatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, popupAvatarButton);
    });
}

//слушатель клика по кнопке сохранения формы добавления аватара
popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

//коллбэк сохранения данных формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupProfileButton);

  //POST запрос добавления имени и описания
  changeProfileInfoRequest(popupProfileNameInput, popupProfileDescriptionInput)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;

      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, popupProfileButton);
    });
}

//слушатель клика по кнопке сохранения формы профиля
popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

//коллбэк сохранения данных формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderSaving(true, popupAddCardButton);

  //POST запрос добавления новой карточки
  addCardRequest(popupAddCardNameInput, popupAddCardLinkInput)
    .then((card) => {
      cardsList.prepend(
        createCard(card, deleteMyCard, openPopupImage, likeCard, accountId)
      );

      closePopup(popupAddCard);
      popupAddCardForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderSaving(false, popupAddCardButton);
    });
}

//слушатель клика по кнопке сохранения формы добавления карточки
popupAddCardForm.addEventListener("submit", handleCardFormSubmit);

//открытие подтверждения удаления картинки
let cardToDelete; // Глобальная переменная для хранения карты, которую нужно удалить

// Открытие подтверждения удаления картинки
function deleteMyCard(card) {
  cardToDelete = card;
  openPopup(popupDeleteCard);
}

// Коллбэк удаления карточки
function handleDeleteClick(evt) {
  evt.preventDefault();

  if (!cardToDelete) {
    console.log("Карта для удаления не определена");
    return;
  }

  const cardId = cardToDelete["_id"];
  deleteCardRequest(cardId)
    .then(() => {
      const deleteCard = document.getElementById(cardId);

      if (deleteCard) {
        deleteCard.remove();
      } else {
        console.log("Элемент не найден на странице");
      }

      cardToDelete = null; // Сбрасываем значение переменной
      closePopup(popupDeleteCard);
    })
    .catch((err) => console.log(err));
}

// Удаление карточки при подтверждении popup
popupDeleteCardButton.addEventListener("click", handleDeleteClick);

//удаление карточки при подтверждении popup
popupDeleteCardButton.addEventListener("click", handleDeleteClick);

//функция уведомления о сохранении
function renderSaving(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = button.dataset.buttonText;
  }
}
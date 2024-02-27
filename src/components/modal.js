const config = {
  openPopupClass: "popup_is-opened",
  animatedPopupClass: "popup_is-animated",
};

//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add(config.openPopupClass);
  document.addEventListener("keydown", closePopupByESC);
  popup.addEventListener("mousedown", closePopupByOverlay);
}

//функция закрытия попапа
export function closePopup(popup) {
  popup.classList.remove(config.openPopupClass);

  //откладываем удаление на время работы анимации

  setTimeout(() => {
    popup.classList.remove(config.animatedPopupClass);
  }, 600);

  document.removeEventListener("keydown", closePopupByESC);
  popup.removeEventListener("mousedown", closePopupByOverlay);
}

//функция закрытия попапа кнопкой ESC
function closePopupByESC(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector("." + config.openPopupClass);

    closePopup(openedPopup);
  }
}

//функция закрытия попапа по оверлэю
function closePopupByOverlay(evt) {
  if (evt.target.classList.contains(config.openPopupClass)) {
    closePopup(evt.target);
  }
}
const config = {
  openPopupClass: "popup_is-opened",
  animatedPopupClass: "popup_is-animated",
};

export function openPopup(popup) {
  popup.classList.add(config.animatedPopupClass);
  popup.classList.add(config.openPopupClass);
  document.addEventListener("keydown", closePopupByESC);
}

export function closePopup(popup) {
  popup.classList.remove(config.openPopupClass);
  popup.classList.remove(config.animatedPopupClass); // Добавляем удаление класса анимации
  document.removeEventListener("keydown", closePopupByESC);
}

function closePopupByESC(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector("." + config.openPopupClass);
    closePopup(openedPopup);
  }
}

export function closePopupByOverlay(evt) {
  if (evt.target.classList.contains(config.openPopupClass)) {
    closePopup(evt.target);
  }
}
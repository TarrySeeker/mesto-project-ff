// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы

const placesContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
//Название карточек не выводилось на страницу

function createCard(cardData, handleDeleteCard) {
  const element = cardTemplate.content.querySelector('.card').cloneNode(true);
  const imgCard = element.querySelector(".card__image");
  const titleCard = element.querySelector(".card__title");
  const buttonLike = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__delete-button");

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  titleCard.textContent = cardData.name;

  deleteButton.addEventListener('click', function () {
    handleDeleteCard(element, cardData);
  });

  return element;
}

//Функция удаления карточки

function deleteCard(element, cardData) {
  element.remove();
}

// Вывести карточки на страницу

function renderCards(cards) {
  cards.forEach(function (cardData) {
    const element = createCard(cardData, deleteCard);
    placesContainer.appendChild(element);
  });
}

renderCards(initialCards);

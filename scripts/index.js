// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(iteam, cardDelete) {
  const cardTemplateContent = cardTemplate.content;
  const element = cardTemplateContent.cloneNode(true);
  const imgCard = element.querySelector(".card__image");
  const titleCard = element.querySelector(".card__title");
  const buttonLike = element.querySelector(".card__like-button");
  const deleteButton = element.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", cardDelete);
  imgCard.src = iteam.link;
  titleCard.name = iteam.name;
  titleCard.alt = iteam.name;
  return element;
}

initialCards.forEach((iteam) => {
  const cardItem = createCard(iteam, deleteCard);
  placesList.append(cardItem);
});

function deleteCard(event) {
  const card = event.target.closest(".places__item");
  card.remove();
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
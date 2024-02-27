const cogort = 'wff-cohort-8'
const token = '4c342f59-ab88-4d05-986e-bf4c6061906b'
const config = {
    baseUrl: `https://nomoreparties.co/v1/${cogort}`,
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  };
  
  /**
   * базовая реализация GET запроса
   * @param { string } uri //частичный путь после базового адреса
   */
  function get(uri) {
    return fetch(config.baseUrl + uri, {
      headers: config.headers,
    }).then(handleResponse);
  }
  
  /**
   * базовая реализация POST запроса
   * @param { string } uri частичный путь после базового адреса
   * @param { object } data данные, передаваемые на сервер
   * @param { string } method HTTP метод запроса
   */
  function post(uri, data, method = "POST") {
    return fetch(config.baseUrl + uri, {
      method,
      headers: config.headers,
      body: JSON.stringify(data),
    }).then(handleResponse);
  }
  
  /**
   * обработчик ошибок запроса
   * @param { Response } response объект с ответом сервера до загрузки данных
   * @return { Promise } в then всегда будет результат
   * @reject { status, error } в catch всегда будет ошибка
   */
  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  };
  
  /**
   * удаление карточки с сервера
   * @param { string } cardId
   * @returns { Promise }
   */
  export function deleteCardRequest(cardId) {
    return post(`/cards/${cardId}`, {}, "DELETE");
  }
  
  /**
   * добавление новой карточки на сервер
   * @param { string } inputName
   * @param { string } inputLink
   * @returns { Promise }
   */
  export function addCardRequest(inputName, inputLink) {
    return post("/cards", {
      name: inputName.value,
      link: inputLink.value,
    });
  }
  
  /**
   * изменение информации профиля
   * @param { string } inputName
   * @param { string } inputDescription
   * @returns { Promise }
   */
  export function changeProfileInfoRequest(inputName, inputDescription) {
    return post(
      "/users/me",
      {
        name: inputName.value,
        about: inputDescription.value,
      },
      "PATCH"
    );
  }
  
  /**
   * отправка нового изображение аватара на сервер
   * @param { string } inputLink
   * @returns { Promise }
   */
  export function changeAvatarRequest(inputLink) {
    return post(
      "/users/me/avatar",
      {
        avatar: inputLink.value,
      },
      "PATCH"
    );
  }
  
  /**
   * запрос информации о моем профиле
   * @returns { Promise }
   */
  export function getMyInfoRequest() {
    return get("/users/me");
  }
  
  /**
   * запрос карточек с сервера
   * @returns { Promise }
   */
  export function getCardsRequest() {
    return get("/cards");
  }
  
  /**
   * удаление лайка карточки с сервера
   * @param { object } card
   * @returns { Promise }
   */
  export function deleteLikeRequest(card) {
    return post(`/cards/likes/${card["_id"]}`, {}, "DELETE");
  }
  
  /**
   * добавление лайка карточки с сервера
   * @param { object } card
   * @returns { Promise }
   */
  export function addLikeRequest(card) {
    return post(`/cards/likes/${card["_id"]}`, {}, "PUT");
  }
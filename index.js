// Настройка подключения к общей базе
const firebaseConfig = {
  databaseURL: "https://simple-chat-test-default-rtdb.firebaseio.com/"
};

// Инициализация
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Поиск элементов
let usernameInput = document.querySelector(`#username`);
let messageInput = document.querySelector(`#message`);
let messagesNode = document.querySelector(`#messages`);
let sendButton = document.querySelector(`#send`);

// 1. ОТПРАВКА СООБЩЕНИЯ
sendButton.addEventListener(`click`, function () {
  let text = messageInput.value;
  
  if (text.trim() === "") return; // Не шлем пустоту

  // Твои автозамены
  text = text
    .replaceAll(`ё`, `е`)
    .replaceAll(`\n`, `<br>`)
    .replaceAll(` - `, ` — `)
    .replaceAll(`:)`, `😊`)
    .replaceAll(`:heart`, `❤️`);

  // Отправляем объект в базу данных (в папку messages)
  db.ref("messages").push({
    username: usernameInput.value || "Аноним",
    text: text,
    date: Date.now()
  });

  // Очищаем поле ввода
  messageInput.value = ``;
});

// 2. ПОЛУЧЕНИЕ СООБЩЕНИЙ (Обновляется у всех само)
db.ref("messages").on("child_added", function (snapshot) {
  let data = snapshot.val();
  
  // Определяем стиль: свои справа, чужие слева (по имени)
  let isMyMessage = data.username === usernameInput.value;
  let alignClass = isMyMessage ? "align-self-end" : "align-self-start";

  let newMessageHTML = `
    <div class="card text-bg-light mb-3 ${alignClass}" style="max-width: 80%;">
      <div class="card-header"><strong>${data.username}</strong></div>
      <div class="card-body">
        <p class="card-text">${data.text}</p>
      </div>
    </div>
  `;

  messagesNode.innerHTML += newMessageHTML;
  
  // Авто-скролл вниз к новому сообщению
  messagesNode.scrollTop = messagesNode.scrollHeight;
});

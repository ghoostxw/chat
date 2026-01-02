const firebaseConfig = {
    databaseURL: "https://simple-chat-test-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Элементы
let usernameInput = document.querySelector(`#username`);
let messageInput = document.querySelector(`#message`);
let messagesNode = document.querySelector(`#messages`);
let sendButton = document.querySelector(`#send`);

// ФУНКЦИЯ ОТПРАВКИ
sendButton.addEventListener(`click`, function () {
    let text = messageInput.value;
    if (!text.trim()) return; // Не шлем пустоту

    // Автозамены
    text = text
        .replaceAll(`ё`, `е`)
        .replaceAll(`\n`, `<br>`)
        .replaceAll(` - `, ` — `)
        .replaceAll(`:)`, `😊`)
        .replaceAll(`:heart`, `❤️`);

    // ПУШИМ В БАЗУ
    db.ref("messages").push({
        username: usernameInput.value,
        text: text,
        timestamp: Date.now()
    });

    messageInput.value = ``;
});

// ФУНКЦИЯ ПОЛУЧЕНИЯ (Слушаем базу в реальном времени)
db.ref("messages").on("child_added", function (snapshot) {
    let data = snapshot.val();
    
    let newMessageHTML = `
    <div class="card text-bg-light mb-3 align-self-end">
      <div class="card-header">${data.username}</div>
      <div class="card-body">
        <p class="card-text">${data.text}</p>
      </div>
    </div>
    `;

    messagesNode.innerHTML += newMessageHTML;
    // Скролл вниз
    messagesNode.scrollTop = messagesNode.scrollHeight;
});



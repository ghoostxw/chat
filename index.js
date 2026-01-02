let usernameInput = document.querySelector(`#username`);
let messageInput = document.querySelector(`#message`);
let messagesNode = document.querySelector(`#messages`);
let sendButton = document.querySelector(`#send`);
let errorNode = document.querySelector(`#error`);

sendButton.addEventListener(`click`, function () {
    let text = messageInput.value;
    text = text.replaceAll(`ё`, `е`);
    text = text.replaceAll(`Ё`, `Е`);
    text = text.replaceAll(`\n`, `<br>`);
    text = text.replaceAll(` - `, ` — `);
    text = text.replaceAll(`:)`, `😊`);
    text = text.replaceAll(`:heart`, `❤️`);
    
    let newMassage = `
    <div class="card text-bg-light mb-3 align-self-end">
      <div class="card-header">
        ${usernameInput.value} 
      </div>
      <div class="card-body">
        <p class="card-text">
          ${text}
        </p>
      </div>
    </div>
    `;

    messagesNode.innerHTML += newMassage;
    messageInput.value = ``;
});





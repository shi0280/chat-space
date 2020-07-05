$(function(){
  function buildHTML(message) {
    if(message.image) {
      let html = 
        `<div class="chat-box" data-message-id=${message.id}>
          <div class="chat__items">
            <div class="chat__items__name">
              ${message.user_name}
            </div>
            <div class="chat__items__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__message">
            <p class="chat__message__content">
              ${message.content}
            </p>
            <img class="chat__message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
      `<div class="chat-box" data-message-id=${message.id}>
        <div class="chat__items">
          <div class="chat__items__name">
            ${message.user_name}
          </div>
          <div class="chat__items__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat__message">
          <p class="chat__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.chat-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !==0 ) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat').append(insertHTML);
        $('.chat').animate( {scrollTop: $('.chat')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});
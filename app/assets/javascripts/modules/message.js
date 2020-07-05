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

  $('.message-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.chat').append(html);
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
      $('.send-btn').prop('disabled', false);
    });
  });
  // 以下はautoReload.jsへ記述  
  // let reloadMessages = function() {
  //   let last_message_id = $('.chat-box:last').data("message-id");
  //   $.ajax({
  //     url: "api/messages",
  //     type: 'get',
  //     dataType: 'json',
  //     data: {id: last_message_id}
  //   })
  //   .done(function(messages) {
  //     if (messages.length !==0 ) {
  //       let insertHTML = '';
  //       $.each(messages, function(i, message) {
  //         insertHTML += buildHTML(message)
  //       });
  //       $('.chat').append(insertHTML);
  //       $('.chat').animate( {scrollTop: $('.chat')[0].scrollHeight});
  //     }
  //   })
  //   .fail(function() {
  //     alert('error');
  //   });
  // };
  // setInterval(reloadMessages, 7000);
});

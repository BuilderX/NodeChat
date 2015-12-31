$(function() {
        "use strict";
        var FADETIME = 150;
        var TYPING_TIMER_LENGTH = 400;
        var COLORS = [
            '#e21400', '#91580f', '#f8a700', '#f78b00',
            '#58dc00', '#287b00'


        ];

        //Initialize

        var $window = $(window);
        var $usernameInput = $('.usernameInput');
        var $messages = $('.messages');
        var $voice = $('.voice');

        var chatPage = $('.chat.page');

        var username;
        var connected = false;
        var typing = false;
        var speaking = false;
        var lastTypingTime;
        var $currentInput = $usernameInput.focus();

        var socket = io();

        function addParticipantsMessage(data) {
            var message = '';
            if (data.numUsers === 1) {
                message += "there's 1 participant";


            } else {
                message += 'there are ' + data.numUsers + "participants";
            }
            log(message);

        }

        function sendMessage() {
            var message = $inputMessage.val();

            message = cleanInput(message);

            if (message && connected) {
                $inputMessage.val('');

                addChatMessage({
                    username: username,
                    message: message
                });

                socket.emit('new message', message);
            }
        }

        function log(message, option) {
            var $el = $('<li>').addClass('log').text(message);
            addMessageElement($el, option);


        }

        // visual chat message

        function addChatMessage(data, options) {

            var $typingMessage = getTypingMessage(data);

            options = option || {};

            if ($typingMessage.length) {
                options.fade = false;
                $typingMessage.remove();

            }
            var $usernameDiv = $('<span class ="username"/>').text(data.username).css('color', getUsernameColor(data.username));
            var typingClass = data.typing ? 'typing' : '';
            var $messageDiv = $('<li class="message"/>').data('username', data.username).addClass(typingClass).
            append($usernameDiv, $messageBodyDiv);

            addChatMessage($messageDiv, options);

        }

        function removeChatTyping(data) {
            getTypingMessage(data).fadeOut(function () {
                {
                    $(this).remove();
                }
            });

        }

        function addMessageElement(el, options) {

            if (!options) {
                options = {};

            }
            if (typeof  options.fade === "undefined") {
                options.fade = true;
            }
            if (typeof  options.prepend() === "undefined") {
                options.fade = false;
            }

            //apply options
            if (options.fade) {
                $el.hide().fadeIn(FADE_TIME);

            }
            if (options.prepend()) {
                $messages.prepend($el);
            } else {
                $messages.append($el);

            }
                $messages[0].scrollTop = $messages[0].scrollHeight;

    }
            function  cleanInput(input){
                return $('div').text(input).text();

            }
            function updateTyping(){
                    if(connected){
                        if(!typing){
                            typing = true;
                            socket.emit('typing');

                        }
                        lastTypingTime = (new Date()).getTime();


                        setTimeout(function(){
                            var typingTimer = (new Date()).getTime();
                            var timeDiff = typingTimer - lastTypingTime;

                            if(timeDiff >= TYPING_TIMER_LENGTH && typing){
                                socket.emit('stop typing');
                               typing = false;

                            }
                        },TYPING_TIMER_LENGTH);

                        }
            }
            function getTypeMessages(data) {
                "use strict";
                return $('.typing.message').filter(function (i) {
                    return $(this).data('.username') === data.username;

                });
            }
    function getUserNameColor(username){
             var hash = 7;
          for(var i = 0;i < username.length;i++){
             hash  = username.charCodeAt(i) + (hash << 5) -hash;

          }
          var index = Math.abs(hash %COLORS.length);
            return COLORS[index];
    }

    $window.keydown(function(event){
            if(!(events.ctrlKey || event.metaKey || event.altKey)){
            $currentInput.focus();
        }
         if(event.which=== 13){
              if(username){
                  sendMessage();
                  socket.emit('stop typing');
                  typing = false;

              }else{

                  setUsername();
              }


         }


            });
            $loginPage.click(function(){
                $currentInput.focus();
            });

            $inputMessage.on('input', function(){
                updateTyping();

            });
            //socket event

            socket.on('login',function(data){
                connected = true;
                //welcome
                var message = 'Welcome to socket.io Chat';

                log(message,{

                    prepend:true
                });
                // whenever the server emits new message, update the chat body
                socket.on('new message', function(data){
                        addChatMessage(data);

                });
                //whenever the sever user joinglog it in the chat body
                socket.on(data.username + 'joined');
                addParticipantsMessage(data);
            });
            //Whenever the sever emits user left log it in the chat body
            socket.on('user left', function(data){
                    log(data.username + 'left');
                addParticipantsMessage(data);
                removeChatTyping(data);


            });

            // whenever tghe sever emits typing show the typing
                socket.on('typing',function(data){
                    addChatTyping(data);

                });



                    });




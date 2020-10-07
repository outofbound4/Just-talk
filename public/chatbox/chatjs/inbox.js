// var username = "Bylancer";
var audioogg = new Audio('audio/chat.ogg');
var audiomp3 = new Audio('audio/chat.mp3');

function scrollDown() {
    var wtf = $('.wchat-chat-body');
    var height = wtf[0].scrollHeight;
    wtf.scrollTop(height);
    $(".scroll-down").css({ 'visibility': 'hidden' });
}

function chatWith(name_user2, id_user2, img_user2, status_user2) {
    if ($("#pane-intro").css('visibility') == 'visible') {
        $("#pane-intro").css({ 'visibility': 'hidden' });
        $(".chat-right-aside").css({ 'visibility': 'visible' });
    }
    createChatBox(name_user2, id_user2, img_user2, status_user2);
    scrollDown();
    $('.top2').attr("data-user", name_user2)
        .attr("data-image", img_user2);
    $("#id_user2").val(id_user2);
    $('.chat-header-title').text(name_user2);

}

function createChatBox(name_user2, id_user2, img_user2, status_user2, minimizeChatBox) {
    var chatFormTpl =
        '<div class="block-wchat" id="chatForm_' + id_user2 + '">' +
        '<div id="typing_on"></div>' +
        '<button class="icon ti-face-smile font-24 btn-emoji" onclick="javascript:chatemoji()" href="javascript:void(0)" id="toggle-emoji"></button>' +
        '<div tabindex="-1" class="input-container">' +
        '<div tabindex="-1" class="input-emoji">' +
        '<div class="input-placeholder" style="visibility: visible;display:none;">Type a message</div>' +
        '<textarea class="input chatboxtextarea" id="chatboxtextarea" name="chattxt" onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + id_user2 + '\');" contenteditable spellcheck="true" style="resize:none;height:20px" placeholder="Type a message"></textarea>' +
        '</div>' +
        '</div>' +
        '<button onclick="javascript:return clickTosendMessage(\'' + id_user2 + '\');" class="btn-icon icon-send fa fa-paper-plane-o font-24 send-container"></button>' +
        '</div>';

    if ($("#chatbox_" + id_user2).length > 0) {
        $("#chatFrom").html(chatFormTpl);
        $(".chatboxtextarea").focus();
        return;
    }

    $(" <div />").attr("id", "chatbox_" + id_user2)
        .addClass("chat chatboxcontent active-chat")
        .attr("data-chat", "person_" + id_user2)
        .attr("client", id_user2)
        .html('<span class="hidecontent"></span>')
        .appendTo($("#resultchat"));
    if (minimizeChatBox != 1) {
        $("#chatFrom").html(chatFormTpl);
    }
    $(".chatboxtextarea").focus();
}

function checkChatBoxInputKey(event, chatboxtextarea, id_user2, send) {
    $(".input-placeholder").css({ 'visibility': 'hidden' });
    addTyping();
    if (event.keyCode == 8)
        removeTyping();

    if ((event.keyCode == 13 && event.shiftKey == 0) || (send == 1)) {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g, "");

        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(".input-placeholder").css({ 'visibility': 'visible' });
        $(".chatboxtextarea").css('height', '20px');
        if (message != '') {
            message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
            message = message.replace(/\n/g, "<br />");
            var $con = message;
            var $words = $con.split(' ');
            for (i in $words) {
                if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
                else if ($words[i].indexOf('www') == 0) {
                    $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
                }
            }
            message = $words.join(' ');
            message = emojione.shortnameToImage(message); // Set imotions
            // $("#chatbox_" + id_user2).append('<div class="col-xs-12 p-b-10 odd">' +
            $("#resultchat").append('<div class="col-xs-12 p-b-10 odd">' +
                '<div class="chat-body">' +
                '<div class="chat-text">' +
                '<input type="hidden" name="message_object_id" id="" value="">' +
                '<p>' + message + '</p>' +
                '<b>' + (new Date()).toISOString() + '</b><span class="msg-status msg-' + id_user2 + '"><i class="fa fa-check"></i></span>' +
                '</div>' +
                '</div>' +
                '</div>');

            $(".target-emoji").css({ 'display': 'none' });
            $('.wchat-filler').css({ 'height': 0 + 'px' });

            scrollDown();
            // this function is defined in Views/chatbox.ejs 
            // this functions work is to save mesaage to the server
            saveMessageToServer(message);
            removeTyping();

            let listItem = $("#" + id_user2);
            let index = $("li").index(listItem);
            if (index != 1) {
                let clonedLI = $("#display li:nth-child(" + index + ")");
                listItem.remove();
                clonedLI.clone().prependTo("#display");
            }
        }

        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 60;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);

        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
    } else {
        $(chatboxtextarea).css('overflow', 'auto');
    }

}

function clickTosendMessage(id_user2) {
    message = $(".chatboxtextarea").val();

    message = message.replace(/^\s+|\s+$/g, "");

    $(".chatboxtextarea").val('');
    $(".chatboxtextarea").focus();
    $(".input-placeholder").css({ 'visibility': 'visible' });
    $(".chatboxtextarea").css('height', '20px');
    if (message != '') {

        message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
        message = message.replace(/\n/g, "<br />");
        var $con = message;
        var $words = $con.split(' ');
        for (i in $words) {
            if ($words[i].indexOf('http://') == 0 || $words[i].indexOf('https://') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
            else if ($words[i].indexOf('www') == 0) {
                $words[i] = '<a href="' + $words[i] + '">' + $words[i] + '</a>';
            }
        }
        message = $words.join(' ');
        message = emojione.shortnameToImage(message);  // Set imotions

        // $("#chatbox_" + id_user2).append('<div class="col-xs-12 p-b-10 odd">' +
        $("#resultchat").append('<div class="col-xs-12 p-b-10 odd">' +
            '<div class="chat-body">' +
            '<div class="chat-text">' +
            '<input type="hidden" name="message_object_id" id="" value="">' +
            '<p>' + message + '</p>' +
            '<b>' + (new Date()).toISOString() + '</b><span class="msg-status msg-' + id_user2 + '"><i class="fa fa-check"></i></span>' +
            '</div>' +
            '</div>' +
            '</div>');

        $(".target-emoji").css({ 'display': 'none' });
        $('.wchat-filler').css({ 'height': 0 + 'px' });
        scrollDown();
        // this function is defined in Views/chatbox.ejs
        // this functions work is to save mesaage to the server
        saveMessageToServer(message);
        removeTyping();

        let listItem = $("#" + id_user2);
        let index = $("li").index(listItem);
        if (index != 1) {
            let clonedLI = $("#display li:nth-child(" + index + ")");
            listItem.remove();
            clonedLI.clone().prependTo("#display");
        }
    }



    var adjustedHeight = $(".chatboxtextarea").clientHeight;
    var maxHeight = 40;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max($(".chatboxtextarea").scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > $(".chatboxtextarea").clientHeight)
            $($(".chatboxtextarea")).css('height', adjustedHeight + 8 + 'px');
    } else {
        $($(".chatboxtextarea")).css('overflow', 'auto');
    }
    return false;
}
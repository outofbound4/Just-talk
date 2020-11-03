$(document).ready(function () {

    $(".e1").click(function (event) {
        var client = $('.chat.active-chat').attr('client');

        // will give the current postion of the cursor
        var curPos = document.getElementById("chatboxtextarea").selectionStart;

        var prevMsg = $('#chatFrom .chatboxtextarea').val();
        var shortname = $(this).data('shortname');
        // alert("in custom.js, shortname : " + shortname)
        var unicodeEmoji = emojione.shortnameToUnicode(shortname);
        // setting the updated value in the text area
        let x = prevMsg.slice(0, curPos) + unicodeEmoji;
        $('#chatFrom .chatboxtextarea').val(prevMsg.slice(0, curPos) + unicodeEmoji + prevMsg.slice(curPos));
        // here setting the cursor position 
        setCaretPosition('chatboxtextarea', x.length);
        // $('#chatFrom .chatboxtextarea').focus();
    });

    $(".chat-head .personName").click(function () {
        var personName = $(this).text();
    });



    $("#launchProfile").click(function () {
        $("#userProfile").html('<div class="preloader"><div class="cssload-speeding-wheel"></div></div>');

        let id_user2 = $("#id_user2").val();
        let statusbar = $("#" + id_user2).attr("data-statusbar");
        let email = $("#" + id_user2).attr("data-email");
        var usname = $('.top2').attr("data-user");
        var img = $('#launchProfile').find('img').attr('src');
        $('#wchat .wchat').removeClass('two');
        $('#wchat .wchat').addClass('three');
        $('.wchat-three').slideDown(50);
        $('.wchat-three').toggleClass("shw-rside");

        var profileTpl = '<div class="">' +
            '<div class="user-bg">' +
            '<div class="overlay-box">' +
            '<div class="user-content"> <a href="javascript:void(0)">' +
            '<img class="thumb-lg img-circle" src="' + img + '"></a>' +
            '<h4 class="text-white">' + usname + '</h4>' +
            '<h5 class="text-white">' + email + '</h5>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="user-btm-box">' +
            '<hr>' +
            '<div class="row text-center m-t-10">' +
            '<div class="col-md-12"><strong>Status</strong><p> ' + statusbar + ' </p></div>' +
            '</div>' +
            '<hr>' +
            '<div class="col-md-1 col-sm-1 text-center">&nbsp;</div>' +
            '</div>' +
            '</div>';

        $("#userProfile").html(profileTpl);
    });

    $(".header-close").click(function () {
        $('#wchat .wchat').removeClass('three');
        $('#wchat .wchat').addClass('two');
        $('.wchat-three').css({ 'display': 'none' });

    });

    $(".scroll-down").click(function () {
        scrollDown();
    });

    $("#mute-sound").click(function () {
        if (eval(localStorage.sound)) {
            localStorage.sound = false;
            $("#mute-sound").html('<i class="icon icon-volume-off"></i>');
        }
        else {
            localStorage.sound = true;
            $("#mute-sound").html('<i class="icon icon-volume-2"></i>');
            audiomp3.play();
            audioogg.play();
        }
    });
    $("#MobileChromeplaysound").click(function () {
        if (eval(localStorage.sound)) {
            audiomp3.play();
            audioogg.play();
        }
    });
    if (eval(localStorage.sound)) {
        $("#mute-sound").html('<i class="icon icon-volume-2"></i>');
    }
    else {
        $("#mute-sound").html('<i class="icon icon-volume-off"></i>');
    }

    //For Mobile on keyboard show/hide

    /*var _originalSize = $(window).width() + $(window).height()
    $(window).resize(function(){
        if($(window).width() + $(window).height() != _originalSize){
            //alert("keyboard show up");
            $(".target-emoji").css({'display':'none'});
            $('.wchat-filler').css({'height':0+'px'});

        }else{
            //alert("keyboard closed");
            $('#chatFrom .chatboxtextarea').blur();
        }
    });*/
});

// it is for setting cuesor postion of textfield
function setCaretPosition(elemId, caretPos) {
    var elem = document.getElementById(elemId);
    elem.focus();
    elem.setSelectionRange(caretPos, caretPos);

    // if (elem.createTextRange) {
    //         var range = elem.createTextRange();
    //         range.move('character', caretPos);
    //         range.select();
    // }

}

function chatemoji() {

    $(".target-emoji").slideToggle('fast', function () {
        if ($(".target-emoji").css('display') == 'block') {
            //alert($(window).height());
            //$('.chat-list').css({'height':(($(window).height())-279)+'px'});
            $('.wchat-filler').css({ 'height': 225 + 'px' });
            $('.btn-emoji').removeClass('ti-face-smile').addClass('ti-arrow-circle-down');
        } else {
            //$('.chat-list').css({'height':(($(window).height())-179)+'px'});
            $('.wchat-filler').css({ 'height': 0 + 'px' });
            $('.btn-emoji').removeClass('ti-arrow-circle-down').addClass('ti-face-smile');
        }
    });
    var heit = $('#resultchat').css('max-height');

}

function typePlace() {

    if (!$('#textarea').html() == '') {
        $(".input-placeholder").css({ 'visibility': 'hidden' });
    }
    else {
        $(".input-placeholder").css({ 'visibility': 'visible' });
    }

}



//Inbox User search
$(document).ready(function () {
    $('.contact-list li').each(function () {
        $(this).attr('data-search-term', $(this).text().toLowerCase());
    });

    $('.live-search-box').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();
        $('.live-search-list li').each(function () {

            if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});

$(window).bind("load", function () {
    //$('.person:first').trigger('click');
    var personName = $('.person:first').find('.personName').text();
    $('.right .top .personName').html(personName);
    //$('.right .top').attr("data-user",personName);
    var userImage = $('.person:first').find('.userimage').html();
    $('.right .top .userimage').html(userImage);
    var personStatus = $('.person:first').find('.personStatus').html();
    $('.right .top .personStatus').html(personStatus);
    var hideContent = $('.person:first').find('.hidecontent').html();
    $('.right .hidecontent').html(hideContent);

    /*$('[contenteditable]').on('paste',function(e) {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text);
    });
*/
    $('.chatboxtextarea').on('focus', function (e) {
        $(".target-emoji").css({ 'display': 'none' });
        $('.wchat-filler').css({ 'height': 0 + 'px' });
        // $('.btn-emoji').removeClass('ti-arrow-circle-down').addClass('ti-face-smile');
    });
});


$('.left .person').mousedown(function () {
    if ($(this).hasClass('.active')) {
        return false;
    } else {
        var findChat = $(this).attr('data-chat');
        var personName = $(this).find('.personName').text();
        $('.right .top .personName').html(personName);
        //$('.right .top').attr("data-user",personName);
        var userImage = $(this).find('.userimage').html();
        $('.right .top .userimage').html(userImage);
        var personStatus = $(this).find('.personStatus').html();
        $('.right .top .personStatus').html(personStatus);
        var hideContent = $(this).find('.hidecontent').html();
        $('.right .hidecontent').html(hideContent);
        $('.chat').removeClass('active-chat');
        $('.left .person').removeClass('active');
        $(this).addClass('active');
        $('.chat[data-chat = ' + findChat + ']').addClass('active-chat');
    }
});



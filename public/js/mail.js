"use scrict";

function sendit(){
    
    const sendid = document.getElementById('sendid');
    const sendmail = document.getElementById('sendmail');
    const toid = document.getElementById('toid');
    const tomail = document.getElementById('tomail');
    const title = document.getElementById('title');


    //email 문자열
    const expEmailText = /^[A-Za-z0-9\.\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;

    if(sendid.value == ""){
        alert('이메일 아이디를 입력해주세요');
        sendid.focus();
        return false;
    }
    if(sendmail.value == ""){
        alert('이메일주소를 정확히 입력해주세요');
        sendmail.focus();
        return false;
    }

    if(expEmailText.test(sendmail.value) == false){
        alert('이메일 형식을 확인해주세요');
        sendmail.focus();
        return false
    }

    if(toid.value == ""){
        alert('받는분 이메일 아이디를 입력해주세요');
        toid.focus();
        return false;
    }
    if(tomail.value == ""){
        alert('받는분 이메일주소를 정확히 입력해주세요');
        tomail.focus();
        return false;
    }

    if(expEmailText.test(tomail.value) == false){
        alert('이메일 형식을 확인해주세요');
        tomail.focus();
        return false
    }

    
    if(title.value == ""){
        alert('제목을 입력해주세요');
        title.focus();
        return false;
    }




}





/*global chrome*/
chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log(msg+" is accepted");
    if(msg == "toggle"){
        toggle();
    }
})

var iframe = document.createElement('iframe');
iframe.style.background = "green";
iframe.style.height = "100%";
iframe.style.width = "350px";
iframe.style.position = "fixed";

//top , right 조건을 통하여 옆의 화면을 꽉채울것인지 띄울것인지 수정가능

iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.frameBorder = "none";
iframe.style.display = "none";
iframe.src = chrome.extension.getURL("index.html");

document.body.appendChild(iframe);


function toggle(){
    if(iframe.style.display == "none"){
        iframe.style.display = "block";
    }
    else{
        iframe.style.display = "none";
    }
}
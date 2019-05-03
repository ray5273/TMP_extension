/*global chrome*/

var textval = window.getSelection();//이런식으로도 인식이 되네
chrome.runtime.onMessage.addListener(function(msg, sender){
    console.log(msg+" is accepted");
    console.log(textval.toString()+" is scrolled");
    if(msg == "toggle"){
        toggle();
    }

});


// text selection시 tooltip 추가 하는 runtime message
chrome.runtime.onMessage.addListener(function(msg,sender) {
    if (msg == "getSelection")
        console.log("get selection completed!");

});
var iframe = document.createElement('iframe');
iframe.style.background = "white";
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
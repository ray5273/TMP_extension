/*global chrome*/
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow:true},
       function(tabs) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, 
              {"message": "clicked_browser_action"}
          );
          console.log("in backgroundjs browser action")
    });
 });

//Fo r URL tracking
//TODO : URL Update시 마다 Background message sender 추가 하여 content script에서 메모를 불러오도록
var curURL = null;
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    curURL = tab.url;
    console.log("tab url:"+curURL);
});

//onMessage test code
chrome.runtime.onMessage.addListener(
    function(request,sender,sendResponse){
        if(request.contentScriptQuery=="queryPrice"){
            console.log("current URL :" +curURL);
        }
    }
)

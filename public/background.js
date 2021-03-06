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
//TODO : URL Update시 마다 Backgryarn ound message sender 추가 하여 content script에서 메모를 불러오도록
var curURL = null;
var curID = null;
async function getData(){
    console.log("getdata!");
    const fetch_url = "https://firestore.googleapis.com/v1/projects/jsp-tmp/databases/(default)/documents/User/User1/Memo/Memo1";
    let options = {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let response = await fetch(fetch_url,options);
    let parse = await response.json();
    console.log(parse);
    return parse;
}

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
    curURL = tab.url;
    console.log("tab url:"+curURL);
    getData();
});

//onMessage test code
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.contentScriptQuery == "queryPrice") {
            console.log("current URL :" + curURL);
        }
        if (request.contentScriptQuery == "getID") {
            console.log("current id:" + request.id);
            curID = request.id;
            console.log("cur id : " + curID);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {message: "getID", id: request.id,url:curURL}, function(response) {});
            });
        }
        if (request.contentScriptQuery == "SignedOut") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {message: "SignedOut"}, function(response) {});
            });
        }
    }
)

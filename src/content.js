/*global chrome*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";

import MainMenu from './components/MainMenu';
import MenuBar from './components/MenuBar';
import { testNameToKey } from 'jest-snapshot/build/utils';
import firebase from './Firebase';
import 'firebase/firestore';
import BookMark_Form from "./components/Bookmarks/Bookmark_Item_Form";
import GetFileName from "./components/PDF/GetFileName";

var uid = null;

class Main extends Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
              <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                      return (
                         <div className={'my-extension'}>                           
                            <MainMenu />
                         </div>
                      )
                   }
                }
               </FrameContextConsumer>
            </Frame>
        )
    }
}

/* 
const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<SignIn />, app);
*/

//여기서 background script의 메세지를 받고
//위에 MemoButton을 DB에서 가져와서 띄워주는 형식으로 해야할것 같다.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            toggle();
            chrome.runtime.sendMessage({
                contentScriptQuery:"queryPrice"
            });
        }
        if (request.message === "getID") {
            uid = request.id;
            console.log("cur url:"+request.url);
            ReactDOM.render(<MenuBar uid={request.id} url ={request.url}/>, test);
            ReactDOM.render(<BookMark_Form uid={request.id} url={request.url} />, document.getElementById('bookmark_popup'));
            ReactDOM.render(<GetFileName uid={request.id} url={request.url}/>,document.getElementById('pdf_popup'));
        }
    }
);

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

const test = document.createElement('div');
test.setAttribute("id",'menu-bar');
document.body.insertBefore(test, document.body.firstChild);

//app.style.display = "none";
iframe.style.display = "none";

var bookMark_popup = document.createElement('div');
bookMark_popup.setAttribute('id', 'bookmark_popup');
bookMark_popup.style.zIndex=2147483647;
bookMark_popup.style.display='none';
document.body.appendChild(bookMark_popup);
// ReactDOM.render(<BookMark_Form uid={uid} url={url} />, document.getElementById('bookmark_popup'));
// ReactDOM.render(<BookMark_Form />, document.getElementById('BookMark_popup'));

var pdf_popup = document.createElement('div');
pdf_popup.setAttribute('id', 'pdf_popup');
pdf_popup.style.zIndex=2147483647;
pdf_popup.style.display='none';
document.body.appendChild(pdf_popup);


function toggle(){
   if (iframe.style.display === "none") {
       iframe.style.display = "block";
       test.setAttribute("id",'menu-bar-iframe');
       var bookmark_popup = document.getElementsByClassName('bookmark_popup');
       bookmark_popup[0].className='bookmark_popup-iframe';

       pdf_popup = document.getElementsByClassName('pdf_popup');
       pdf_popup[0].className = 'pdf_popup-iframe';
       // bookmark_popup[0].setAttribute("className",'bookmark_popup-iframe');
   }
   else {
       iframe.style.display = "none";
       test.setAttribute("id",'menu-bar');
       var bookmark_popup = document.getElementsByClassName('bookmark_popup-iframe');
       bookmark_popup[0].className='bookmark_popup';
       pdf_popup = document.getElementsByClassName('pdf_popup-iframe');
       pdf_popup[0].className = 'pdf_popup';
   }
}


/*
function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}
*/


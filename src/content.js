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
ReactDOM.render(<MenuBar />, test);


//app.style.display = "none";
iframe.style.display = "none";

function toggle(){
   if(iframe.style.display == "none"){
       iframe.style.display = "block";
   }
   else{
       iframe.style.display = "none";
   }
}


//여기서 background script의 메세지를 받고
//위에 MemoButton을 DB에서 가져와서 띄워주는 형식으로 해야할것 같다.
chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
        chrome.runtime.sendMessage({
            contentScriptQuery:"queryPrice"
        });
          console.log("browser action ended");
      }
      if(request.message==="getID"){
          uid = request.id;
      }
   }
);

/*
function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}
*/


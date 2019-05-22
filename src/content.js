/*global chrome*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import MenuBar from './components/MenuBar';
import { testNameToKey } from 'jest-snapshot/build/utils';

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

const app = document.createElement('div');
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);


const test = document.createElement('div');
test.setAttribute("id",'menu-bar');
document.body.insertBefore(test, document.body.firstChild);
ReactDOM.render(<MenuBar />, test);

app.style.display = "none";

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
      //
   }
);
function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}


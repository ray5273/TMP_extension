/*global chrome*/
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import MemoButton from './components/MemoButton';
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
ReactDOM.render(<MemoButton />, test);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);
function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}
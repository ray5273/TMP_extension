/*global chrome*/
import React, { Component } from 'react';
import DomMemo from './Memo/DomMemo';
import HighLight from './Highlight/Tooltip';
import DrawingTool from './Memo/DrawingTool'
import Firebase from '../Firebase.js'
import * as firebaseui from 'firebaseui'
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import DragImage from "./Memo/DragImage"
import ReactDOM from 'react-dom';

//const URL = "https://tmp-test-1a336.firebaseio.com/";

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words:{},
            url:'',
            data:''
        }
    }
        
    componentDidMount() {
        console.log("uiduiduiduiduiduid",this.props.uid);

        let storage = Firebase.storage();
        let storageRef = storage.ref();
        console.log("component did update!");
        let i=0;
        for(let i =0;i<10;i++){
            //let i=1;
            console.log("iteration:"+i);
            let imageMemo = document.createElement('div');
            let end = false;
            imageMemo.setAttribute('id', `imageMemo${i}`);
            imageMemo.style.position = 'absolute';
            imageMemo.style.width = "300px";
            //sticky memo 생성위치 조정
            imageMemo.style.top = window.scrollY + 'px';
            imageMemo.style.left = window.scrollX + this.state.t * 50 + 'px';
            // stickyMemo.style.top = `${this.state.MemoTop}px`;
            // stickyMemo.style.left = `${this.state.MemoLeft}px`;
            //stickymemo를 z-index 통해 최상위로 올려줌
            imageMemo.style.zIndex = 2147483647;
            let real_image = storageRef.child(`data${i}.png`);
            console.log("real image : " + real_image);
            //        if(real_image==null)
            //            break;
            document.body.appendChild(imageMemo);
            real_image.getDownloadURL().then(function (url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function (event) {
                    var blob = xhr.response;
                };
                xhr.open('GET', url);
                xhr.send();
                console.log("get image data!");
                // Or inserted into an <img> element:
                //var img = document.getElementById('imageMemo');
                ReactDOM.render(<DragImage push_src={url} push_x={window.scrollX+50*i} push_y={window.scrollY+50*i}/>, document.getElementById(`imageMemo${i}`));
            }).catch(function (error) {
                // Handle any errors
                console.log("cannot get image data!");
                end = true;
            });
            if(end)
                break;
            //}
        }

    }


    render() {
        return (
            <React.Fragment>
                {firebaseui.auth.AuthUI.getInstance() == null?
            console.log("유저가 null")
            :console.log("유저가 있음")}

                )}
                {console.log("test for realtime db", this.state.words)}
                <div className="menus"> <p>북마크</p></div>
                <div className="menus"> <p>PDF</p></div>
                <DomMemo />
                <DrawingTool uid = {this.props.uid} url = {this.props.url}/>
                <HighLight />
            </React.Fragment>
        );
    }

}


export default MenuBar;

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
import memo_bookmark_icon from '../assets/menuBar/bookmark.png';
import pdf_icon from '../assets/menuBar/pdf.png';
import left_arrow_icon from '../assets/menuBar/left_arrow.png';
import right_arrow_icon from '../assets/menuBar/right_arrow.png';

//const URL = "https://tmp-test-1a336.firebaseio.com/";

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            words:{},
            url:'',
            data:'',
            open:true
        }
    }
        
    componentDidMount() {
        console.log("uiduiduiduiduiduid",this.props.uid);

        let storage = Firebase.storage();
        let storageRef = storage.ref();
        var database = Firebase.firestore();
        var uid = this.props.uid;
        var url = this.props.url;

        // 주소 URL이 path를 의미하는 / 를 포함하기때문에 인코딩 디코딩 과정 추가
        url = encodeURIComponent(url);

        //여기서 url에 대한 image memo count가 존재하는지 먼저 파악 없을시 아무것도 띄우지 않음
        //image memo count가 존재 할 시 존재하는 숫자만큼 이미지를 띄움.
        database.collection("User").doc(uid).collection(url).doc("MemoImage").get().then(function(doc){
            //존재 할 시
            if(doc.exists){
                console.log("in database doc");
                var image_data_num = doc.data().imageCount;
               for(let i =1;i<=image_data_num;i++) {
                    var imagePath = uid + '/' + url + '/' + `image${i}.png`;
                    var dataRef = storageRef.child(imagePath);
                    console.log("image path : " + imagePath);

                    let imageMemo = document.createElement('div');
                    imageMemo.setAttribute('id', `imageMemo${i}`);
                    imageMemo.style.position = 'absolute';
                    imageMemo.style.width = "300px";
                    //sticky memo 생성위치 조정
                    imageMemo.style.top = window.scrollY + 'px';
                    imageMemo.style.left = window.scrollX + 'px';
                    //stickymemo를 z-index 통해 최상위로 올려줌
                    imageMemo.style.zIndex = 2147483647;
                    document.body.appendChild(imageMemo);
                    var curpage = url;

                   let real_image = storageRef.child(imagePath);
                    console.log("real image : " + real_image);
                    database.collection("User").doc(uid).collection(url).doc(`ImageMetadata${i}`).get().then(function(doc){

                        const x_pos = doc.data().x;
                        const y_pos = doc.data().y;
                        // console.log("xpos : ",x_pos);
                        // console.log("ypos :",y_pos);
                        real_image.getDownloadURL().then(function (url) {
                            console.log("get image data!");
                            ReactDOM.render(<DragImage src={url} push_x={x_pos} url={curpage}
                                                       push_y={y_pos} idx={i} uid={uid}/>, document.getElementById(`imageMemo${i}`));
                        }).catch(function (error) {
                            // Handle any errors
                            console.log("cannot get image data!"+error);
                        });

                    });
                 }
            }else{
               console.log("image memo not founded");
            }
        });

    }


    render() {
        return (
            <React.Fragment>
                {this.state.open
                    ?
                    <div className="menu-container">
                        <div className="menus">
                            <img src={right_arrow_icon} alt="" onClick={()=>this.setState({open:!this.state.open})}/>
                        </div>
                        <div className="menus">
                            <img src={memo_bookmark_icon} alt="" />
                        </div>
                        <div className="menus">
                        <img src={pdf_icon} alt="" />
                        </div>
                        <DomMemo />
                        <DrawingTool uid = {this.props.uid} url = {this.props.url}/>
                        <HighLight uid = {this.props.uid} url = {this.props.url}/>
                    </div>
                    :
                    <div className="menus">
                        <img src={left_arrow_icon} alt="" onClick={()=>this.setState({open:!this.state.open})}/>
                    </div>
                }
            </React.Fragment>
        );
    }

}


export default MenuBar;

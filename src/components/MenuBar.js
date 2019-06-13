/*global chrome*/
import React, {Component} from 'react';
import DomMemo from './Memo/DomMemo';
import HighLight from './Highlight/Tooltip';
import DrawingTool from './Memo/DrawingTool'
import Firebase from '../Firebase.js'
import BookMark from './Bookmarks/Bookmark'
import PDF from './PDF/PDF'
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import DragImage from "./Memo/DragImage"
import ReactDOM from 'react-dom';
//import memo_bookmark_icon from '../assets/menuBar/bookmark.png';
//import pdf_icon from '../assets/menuBar/pdf.png';
import left_arrow_icon from '../assets/menuBar/left_arrow.png';
import right_arrow_icon from '../assets/menuBar/right_arrow.png';
import DragText from './Memo/DragText';
import * as rangy from 'rangy'
import "rangy/lib/rangy-serializer";
import HighlightMenu from "./Highlight/HighlightMenu";

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
    // callStickyMemo = () => {
    // //    window.alert("sticky memo!");
    //     console.log("call sticky memo function");
    //     var i;
    //     for (i=0; i<this.state.data.length; i++) {
    //         console.log(i,"번쨰 posX",this.state.data[i].posX);
    //         console.log(i,"번쨰 text",this.state.data[i].text);
    //         if(document.getElementById(`stickyMemo${i}`)==null) {
    //             var stickyMemo = document.createElement('div');
    //             stickyMemo.setAttribute('id', `stickyMemo${i}`);
    //             stickyMemo.style.position = 'absolute';
    //             stickyMemo.style.width="300px";
    //             stickyMemo.style.top = window.scrollY+'px';
    //             stickyMemo.style.left = window.scrollX + i*50+'px';
    //             stickyMemo.style.zIndex=2147483647;
    //             stickyMemo.setAttribute('class', 'memo-before-render');
    //             document.body.appendChild(stickyMemo);
    //             // ReactDOM.render(<Input />, document.getElementById(`stickyMemo${this.state.t}`));
    //             ReactDOM.render(<DragText
    //             id={this.state.data[i].id}
    //             index={i}
    //             posX={this.state.data[i].posX}
    //             posY={this.state.data[i].posY}
    //             text={this.state.data[i].text}
    //             uid = {this.props.uid} url = {this.props.url} data={this.props.data}/>, document.getElementById(`stickyMemo${i}`));
    //             //Painterro().show();
    //         }
    //
    //     }
    // };

    componentDidMount() {
        //bookmark div 부분 생성
        //ReactDOM.render(<BookMark_Form uid={this.props.uid} url={this.props.url} />, document.getElementById('bookmark_popup'));
       // ReactDOM.render(<BookMark_Form uid={this.props.uid} url={this.props.url} />, document.getElementById('bookmark_popup-iframe'));

        let storage = Firebase.storage();
        let storageRef = storage.ref();
        var database = Firebase.firestore();
        var uid = this.props.uid;
        var url = this.props.url;

        // 주소 URL이 path를 의미하는 / 를 포함하기때문에 인코딩 디코딩 과정 추가
        url = encodeURIComponent(url);
        /* 
        database.collection("User").doc(this.props.uid).collection("Url").doc(url).set(
            {
                memos: [{
                    x:"departFocu",
                    y:"sdg",
                    c:"Sdgsdfsd"
                },
                {
                    x:"depsdgFocu",
                    y:"ssg",
                    c:"Sdssd"
                }]
            }
        )
       */

        // Load Sticky Memo

        database.collection("User").doc(uid).collection("Url").doc(url).collection("Memos")
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        var data = change.doc.data();

                        if (document.getElementById(`stickyMemo_${change.doc.id}`) == null) {
                            var stickyMemo = document.createElement('div');
                            stickyMemo.setAttribute('id', `stickyMemo_${change.doc.id}`);
                            stickyMemo.style.position = 'absolute';
                            stickyMemo.style.width="300px";
                            stickyMemo.style.top = window.scrollY+'px';
                            stickyMemo.style.left = window.scrollX +'px';
                            stickyMemo.style.zIndex=2147483647;
                            stickyMemo.setAttribute('class', 'memo-before-render');
                            document.body.appendChild(stickyMemo);
                            // ReactDOM.render(<Input />, document.getElementById(`stickyMemo${this.state.t}`));
                            ReactDOM.render(<DragText
                                id={change.doc.id}
                                posX={data.posX}
                                posY={data.posY}
                                text={data.content}
                                uid = {uid} url = {decodeURIComponent(url)}/>, document.getElementById(`stickyMemo_${change.doc.id}`));
                            //Painterro().show();
                        }
                    }
                    if (change.type === 'modified') {
                    }
                    if (change.type === 'removed') {
                        document.getElementById(`stickyMemo_${change.doc.id}`).remove();
                    }
                });

        });
        // get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //     });
        //
        // });
        // Load Sticky Memo End

        // Load Highlights
        rangy.init();
        database.collection("User").doc(uid).collection("Url").doc(url).collection("Highlights").get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var data = doc.data();

                var rootNode = document.evaluate(data.ancestorXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                console.log("rootNode : ", rootNode);
                var selRange = rangy.deserializeRange(data.serialized, rootNode);

                if (selRange.toString() === data.text) {
                    var newNode = document.createElement("span");
                    var color = data.color;

                    newNode.setAttribute(
                        "style",
                        `background-color: ${color}; display: inline;`
                    );
                    newNode.setAttribute('id', `highlight_${doc.id}`);
                    newNode.addEventListener('click', (e)=> {
                        var toolTipDiv = document.createElement('div');
                        toolTipDiv.setAttribute('id', 'toolTipDiv');

                        toolTipDiv.style.position = 'absolute';
                        toolTipDiv.style.top = window.scrollY+ e.clientY + "px";
                        // toolTipDiv.style.visibility = "visible";
                        toolTipDiv.style.left = window.scrollX+ e.clientX + "px";
                        // toolTipDiv.style.top = selection_pos.top + 40 + "px";
                        // toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
                        toolTipDiv.style.visibility = "visible";
                        toolTipDiv.style.display="block";
                        document.body.appendChild(toolTipDiv);
                        ReactDOM.render(<HighlightMenu uid={uid} url={decodeURIComponent(url)} node={e.target}/>, toolTipDiv); //ret={this.retModifiedColor}
                        setTimeout(function(){
                            toolTipDiv.parentElement.removeChild(toolTipDiv);
                        }, 3000);
                    } );
                    //newNode.appendChild(selRange.extractContents());
                    //selRange.insertNode(newNode);
                    selRange.surroundContents(newNode);

                    // ReactDOM.render(<Palette
                    //     isNew={true}
                    //     color={color}
                    //     hid={doc.id}
                    //     uid = {uid} url = {decodeURIComponent(url)}/>, newNode);
                }
            });
        })
        .catch(function(err) {
            console.log(err);
        });
        // Load Highlights End

        //여기서 url에 대한 image memo count가 존재하는지 먼저 파악 없을시 아무것도 띄우지 않음
        //image memo count가 존재 할 시 존재하는 숫자만큼 이미지를 띄움.
        database.collection("User").doc(uid).collection("Url").doc(url).onSnapshot(function(doc){
            //존재 할 시
            if(doc.exists){
                console.log("in database doc");
                var image_data_num = doc.data().imageCount;
                for(let i =1;i<=image_data_num;i++) {
                    var imagePath = uid + '/' + url + '/' + `image${i}.png`;
                    //var dataRef = storageRef.child(imagePath);
                    console.log("image path : " + imagePath);

                    let imageMemo = document.createElement('div');
                    imageMemo.setAttribute('id', `imageMemo${i}`);
                    imageMemo.style.position = 'absolute';
                    imageMemo.style.width = "300px";
                    //sticky memo 생성위치 조정
                    imageMemo.style.top = '0px';
                    imageMemo.style.left = '0px';
                    //stickymemo를 z-index 통해 최상위로 올려줌
                    imageMemo.style.zIndex = 2147483647;
                    document.body.appendChild(imageMemo);
                    var curpage = url;

                    let real_image = storageRef.child(imagePath);
                    console.log("real image : " + real_image);
                    database.collection("User").doc(uid).collection("Url").doc(url).collection(`ImageMetadata${i}`).doc("pos").get().then(function(doc){

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

        //image memo count가 존재 할 시 존재하는 숫자만큼 이미지를 띄움.
        // database.collection("User").doc(uid).collection("Url").doc(url).get().then(function(doc){
        //     //존재 할 시
        //     if(doc.exists){
        //         console.log("in database doc");
        //         var image_data_num = doc.data().imageCount;
        //        for(let i =1;i<=image_data_num;i++) {
        //             var imagePath = uid + '/' + url + '/' + `image${i}.png`;
        //             //var dataRef = storageRef.child(imagePath);
        //             console.log("image path : " + imagePath);
        //
        //             let imageMemo = document.createElement('div');
        //             imageMemo.setAttribute('id', `imageMemo${i}`);
        //             imageMemo.style.position = 'absolute';
        //             imageMemo.style.width = "300px";
        //             //sticky memo 생성위치 조정
        //             imageMemo.style.top = '0px';
        //             imageMemo.style.left = '0px';
        //             //stickymemo를 z-index 통해 최상위로 올려줌
        //             imageMemo.style.zIndex = 2147483647;
        //             document.body.appendChild(imageMemo);
        //             var curpage = url;
        //
        //             let real_image = storageRef.child(imagePath);
        //             console.log("real image : " + real_image);
        //             database.collection("User").doc(uid).collection("Url").doc(url).collection(`ImageMetadata${i}`).doc("pos").get().then(function(doc){
        //
        //                 const x_pos = doc.data().x;
        //                 const y_pos = doc.data().y;
        //                 // console.log("xpos : ",x_pos);
        //                 // console.log("ypos :",y_pos);
        //                 real_image.getDownloadURL().then(function (url) {
        //                     console.log("get image data!");
        //                     ReactDOM.render(<DragImage src={url} push_x={x_pos} url={curpage}
        //                                                push_y={y_pos} idx={i} uid={uid}/>, document.getElementById(`imageMemo${i}`));
        //                 }).catch(function (error) {
        //                     // Handle any errors
        //                     console.log("cannot get image data!"+error);
        //                 });
        //
        //             });
        //          }
        //     }else{
        //        console.log("image memo not founded");
        //     }
        // });

    }

    render() {
        return (
            <React.Fragment>
                {this.state.open
                    ?
                    <div className="menu-container">
                        <div className="menus" >
                            <img src={right_arrow_icon} id="menu_bar_right_icon" alt="" onClick={()=>this.setState({open:!this.state.open})}/>
                        </div>
                        <BookMark uid = {this.props.uid} url = {this.props.url}/>
                        <PDF url={this.props.url}/>
                        <DomMemo uid = {this.props.uid} url = {this.props.url}/>
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DragText from './DragText';
import memo_add_icon from '../../assets/menuBar/add.png';
import firebase from '../../Firebase'

import Painterro from 'painterro_tmp'
class DomMemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            t: 0,
            MemoTop :0,
            MemoLeft :0,
        }
    }

    addStickyMemo = () => {
        this.setState({
            t: this.state.t + 1,
        });

        var db = firebase.firestore();
        var url = encodeURIComponent(this.props.url);

        var title = document.getElementsByTagName('title')[0].innerHTML;

        var mid = "";

        db.collection("User").doc(this.props.uid).collection("Url").doc(url).collection("Memos").add({
            title: title,
            url: url,
            url: decodeURIComponent(url),
            posX: 10,
            posY: 30,
            content: ''
        })
        .then(function(docRef) {
            console.log("Generated memo id: ", docRef.id);
            mid = docRef.id;
        })
        .catch(function(error) {
            console.error("Error inserting memo data: ", error);
        });

        if (document.getElementById(`stickyMemo_${mid}`) == null) {
            var stickyMemo = document.createElement('div');
            stickyMemo.setAttribute('id', `stickyMemo_${mid}`);
            stickyMemo.style.position = 'absolute';
            stickyMemo.style.width="300px";
            //sticky memo 생성위치 조정
            stickyMemo.style.top = window.scrollY+'px';
            stickyMemo.style.left = window.scrollX + this.state.t*50+'px';
            // stickyMemo.style.top = `${this.state.MemoTop}px`;
            // stickyMemo.style.left = `${this.state.MemoLeft}px`;
            //stickymemo를 z-index 통해 최상위로 올려줌
            stickyMemo.style.zIndex=2147483647;
            stickyMemo.setAttribute('class', 'memo-before-render');
    
            // var testbtn = document.createElement('input');
            // testbtn.text = 'button';
            // stickyMemo.appendChild(testbtn);
            //console.log(stickyMemo);
           // console.log("stickymemo top pos : "+stickyMemo.style.top.toString());
            //console.log("stickymemo left pos : "+stickyMemo.style.left.toString());
            document.body.appendChild(stickyMemo);
            // ReactDOM.render(<Input />, document.getElementById(`stickyMemo${this.state.t}`));

            //<DragText
            //    uid = {this.props.uid} url = {this.props.url} data={this.props.data}/>, document.getElementById(`stickyMemo${i}`));
            ReactDOM.render(<DragText isNew = {true} id = {mid} uid = {this.props.uid} url = {this.props.url}/>, document.getElementById(`stickyMemo_${mid}`));
            //Painterro().show();
        }
    };
    
    
    render() {
        return (
            <div className="menus" onClick={this.addStickyMemo}>
                <img src={memo_add_icon} alt=""/>
            </div>
        );
    }
}


export default DomMemo;

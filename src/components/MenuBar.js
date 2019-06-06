/*global chrome*/
import React, { Component } from 'react';
import DomMemo from './Memo/DomMemo';
import HighLight from './Highlight/Tooltip';
import DrawingTool from './Memo/DrawingTool'
import axios from 'axios';
import "firebase/auth";
import firebase from '../Firebase.js'
import * as firebaseui from 'firebaseui'
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
/* 
    test = () => {
        axios.post(`${URL}/test.json`,  {
            test2: "doing test~~~",
        })
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error);
            })
    }

    testGet=()=>{
        axios.get(`${URL}/test.json`)
            .then(res => {
                   console.log(res);
                console.log("content :::", res["config"]);
            })
            .catch(e => { console.log(e); });
        
        
    }
    getData() {
        fetch(`${URL}/test.json`).then(res => {
        if(res.status != 200) {
        throw new Error(res.statusText);
        }
        return res.json();
        }).then(words => this.setState({words: words}));
    }
    */

    
    /* 
    postData(word) {
        return fetch(`${URL}/test.json`, {
        method: 'POST',
        body: JSON.stringify(word)
        }).then(res => {
        if(res.status != 200) {
        throw new Error(res.statusText);
        }
        return res.json();
        }).then(data => {
        let nextState = this.state.words;
        nextState[data.name] = word;
        this.setState({words: nextState});
        });
    }
    */
        
    componentDidMount() {
        console.log("uiduiduiduiduiduid",this.props.uid);
        /*
        if (firebaseui.auth.AuthUI.getInstance() == null) { 
            console.log("유저가 null");
        }
        else {
            console.log("유저가 있음");
        }
         */

        /* 
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
            var tabUrl = tabs[0].url;
            console.log("tabUrl :" + tabUrl);
            this.setState({
                url: tabUrl
            });
        }.bind(this));
        */

        var db = firebase.firestore();
        var docRef = db.collection("memo").doc("a");

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                this.setState({
                    data: doc.data()
                })
                console.log(this.state.data);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        console.log()
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
                <DrawingTool/>
                <HighLight />
            </React.Fragment>
        );
    }

}


export default MenuBar;

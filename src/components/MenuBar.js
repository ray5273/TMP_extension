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
    render() {
        return (
            <React.Fragment>
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

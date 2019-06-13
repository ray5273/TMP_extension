import React, {Component} from 'react';
import memo_bookmark_icon from "../../assets/menuBar/bookmark.png";
//import BookMark_Form from './Bookmark_Item_Form'
//import ReactDOM from "react-dom";
import './CSS/BookMark.css'
//import DragText from "../Memo/DragText";
//import {Category} from "./BookmarkStructures";

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addBookmark: false,
            openRemoveCategory: false
        }
    };

    componentDidMount() {

        //const url = this.props.url;
        //const uid = this.props.uid;

    }

    addBookMark = () => {

        const url = this.props.url;
        const uid = this.props.uid;
        console.log("in bookmark url:" + url);
        console.log("in bookmark uid:" + uid);
        var bookMark_popup = document.getElementById('bookmark_popup');

        if (bookMark_popup.style.display == 'none') {

            bookMark_popup.style.display = 'block';
        } else {
            bookMark_popup.style.display = 'none';
        }
    };


    render() {
        return (
            <div className="menus" onClick={this.addBookMark}>
                <img src={memo_bookmark_icon} id="menu_bookmark_icon" alt=""/>
            </div>
        );
    }
}

export default Bookmark;
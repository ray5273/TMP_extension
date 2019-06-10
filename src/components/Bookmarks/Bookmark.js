import React, {Component} from 'react';
import memo_bookmark_icon from "../../assets/menuBar/bookmark.png";
import BookMark_Form from './Bookmark_Item_Form'
import ReactDOM from "react-dom";
import './CSS/BookMark.css'
import DragText from "../Memo/DragText";
import {Category} from "./BookmarkStructures";

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addBookmark: false,
            // categories: this.getCategoryListFromFirebase(),
            openRemoveCategory: false
        }
    };
    // getCategoryListFromFirebase = () => {
    //     var b1 = new Bookmark('https://www.naver.com', '네이버','testing....', '#연습');
    //     var b2 = new Bookmark('https://www.google.com', '구글','testing....', "#연습");
    //     const bookmarklist = [b1, b2];
    //
    //     return [].concat(new Category(this.categoryId++, '기본카테고리', bookmarklist))
    // }
    componentDidMount(){

        // const url = this.props.url;
        // const uid = this.props.uid;
        // var bookMark_popup = document.getElementById('bookmark_popup');
        // var bookMark_popup_iframe = document.getElementById('bookmark_popup-iframe');
        // if(bookMark_popup!=null){
        //     ReactDOM.render(<BookMark_Form uid={uid} url={url} />, document.getElementById('bookmark_popup'));
        // }
        // if(bookMark_popup_iframe!=null){
        //     ReactDOM.render(<BookMark_Form uid={uid} url={url} />, document.getElementById('bookmark_popup-frame'));
        // }
        const url = this.props.url;
        const uid = this.props.uid;


    }

    addBookMark = () => {

        const url = this.props.url;
        const uid = this.props.uid;
        console.log("in bookmark url:"+url);
        console.log("in bookmark uid:"+uid);
        var bookMark_popup = document.getElementById('bookmark_popup');

        if(bookMark_popup.style.display=='none'){

            bookMark_popup.style.display='block';
        }else{
            bookMark_popup.style.display='none';
        }
    };


    render() {
        return (
            <div className="menus" onClick={this.addBookMark}>
                <img src={memo_bookmark_icon} alt="" />
            </div>
        );
    }
}

export default Bookmark;